const { register } = require('./src/repositories/userRepository')

const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const {Server} = require("socket.io");
const port = process.env.PORT || 2002;
const port_group = 7000;
const { userRouter, messengerRouter, roomRouter} = require("./src/routes/index");
const connect = require("./src/databases/mongodb");
const checkToken = require("./src/authentication/auththentication");
const cors = require("cors")
const { join } = require("node:path");
const server = http.createServer(app);
const server_group = http.createServer(app);
//
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
// CORS middleware
app.use(cors({origin: true}));
// check token
// app.use(checkToken);
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// 
app.use(express.static("./src"))
// url users
app.use("/users", userRouter);
// url messengers
app.use("/messengers", messengerRouter)
// url rooms
app.use("/rooms", roomRouter)

// const socketIo = require("socket.io")(server, {
const socketIo = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: "*",
  }
}); 
const socketIo_group = require("socket.io")(server_group, {
  cors: {
    origin: "*",
  }
}); 
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 

let messages = [];

let rooms = []

socketIo.on("connection", (socket) => {

  // Demo Socket
  socket.on('sendUserIdToServer', user => {
    socketIo.emit(user.phoneNumber, messages);

    socket.on(user.phoneNumber, data => {
      console.log("----------------------------------------");
      console.log("Listening on " + user.phoneNumber);
      console.log("Message data");
      console.log(data);

      data.id = new Date().valueOf();
      
      console.log("Array messages");
      console.log(messages);

      let roomFounds = rooms.filter(room => {
        return room.phoneNumber == data.receiver
      });

      // console.log("Room found");
      // console.log(roomFounds);

      // Neu tin nhan nay la tin nhan danh cho room
      if (roomFounds.length > 0) {
        data.chat_type = "room"
        messages.push(data);

        for (let i = 0; i < roomFounds[0].user.length; i++) {
          // console.log("User in that room");
          // console.log(roomFounds[0].user[i]);

          socketIo.emit(roomFounds[0].user[i], messages);
        }

        socketIo.emit(data.receiver, messages);
        socketIo.emit(data.sender, messages);
      } else {
        data.chat_type = "1-1"
        messages.push(data);

        socketIo.emit(data.receiver, messages);
        socketIo.emit(data.sender, messages);
      } 
    })
  });

  socket.on("deleteMessage", idMessage => {
    let messageToDelete = messages.findIndex(x => x.id === idMessage);

    if (messageToDelete != -1)
      messages[ messages.findIndex(x => x.id === idMessage) ].status = "deleted";

    console.log("Deleted message");
    console.log(messageToDelete);
    console.log("New message after deleted");
    console.log(messages);

    socketIo.emit(messages[ messages.findIndex(x => x.id === idMessage) ].sender, messages);
    socketIo.emit(messages[ messages.findIndex(x => x.id === idMessage) ].receiver, messages);
  });

  console.log("New client connected" + socket.id);

  socket.on('chat-message',data => {
    socketIo.emit('chat-message', data)
  })

  socket.on("join", data => {
    socket.join(data);

    if ( rooms.find(elem => elem.id == data) == undefined ) {
      let room = {"id": data, "messages": []};
      rooms.push(room);
    }
  });

  socket.on("join-room", data => {
    // console.log("Rooms id");
    // console.log(data.id);
    socket.join(data.id);

    if ( rooms.find(elem => elem.id == data.id) == undefined ) {
      rooms.push(data);
    }
    // console.log("Create room");
    // console.log(rooms);
  });

  socket.on("init-room", userId => {
    socket.join(userId);

    console.log("------- Init rooms");
    console.log("Rooms");
    console.log(rooms);

    let list_rooms = [];
    list_rooms = rooms.filter(elem => {
      if (elem.admin == userId) return true;

      if (elem.user != undefined)
        return elem.user.includes(userId)
      else
        return false;
    });

    if (list_rooms == undefined)
      list_rooms = [];

    console.log("List room");
    console.log(list_rooms);

    if (list_rooms.length > 0)
      for (let i = 0; i < list_rooms.length; i++) {
        console.log("List rooms id");
        console.log(list_rooms[i].id);
        socketIo.to(userId).emit("rooms2", list_rooms);

        for (let j = 0; j < list_rooms[i].user.length; j++)
          socketIo.to(list_rooms[i].user[j]).emit("rooms2", list_rooms);

        socketIo.to(list_rooms[i].id).emit("rooms2", list_rooms);
      }
  });

  socket.on("init-chat-message", idRoom => {
    console.log("Init chat message");

    console.log("Room id");
    console.log(idRoom);
    console.log("Found room");
    console.log(rooms.find(elem => elem.id == idRoom));
    
    if ( rooms.find(elem => elem.id == idRoom) ) {
      socketIo.to(idRoom).emit("rooms", 
        rooms.find(elem => elem.id == idRoom).messages
      );
    }
  });

  socket.on("chat-message", async data => {
    console.log(rooms.find(elem => elem.id == data.idRoom));
    
    if ( rooms.find(elem => elem.id == data.idRoom) != undefined ) {
      rooms.find(elem => elem.id == data.idRoom).messages.push(data);
    }

    socketIo.to(data.idRoom).emit("chat-message-2", 
      rooms.find(elem => elem.id == data.idRoom).messages
    );
    
    console.log("----------------------------");
    console.log("-- Socket: Sended data to client ");
  });

  socket.on("forward-message", async data => {
    let found_room = rooms.find(room => room.id == data.idRoom);

    let found_message = found_room.messages.find(mess => mess.idMessage = data.idMessageToForward);
  
    console.log("------- Found Message to forward---------");
    console.log(found_message);
  });

  socket.on("remove-message", async data => {
    let found_room = rooms.find(room => room.id == data.idRoom);

    let found_message = found_room.messages.find(mess => mess.idMessage == data.idMessageToRemove);
    found_message.status = "removed";
  
    console.log("------- Found Message to remove---------");
    console.log(found_message);

    socketIo.to(data.idRoom).emit("chat-message-2", 
      found_room.messages
    );
  });

  socket.on("delete-message", async data => {
    let found_room = rooms.find(room => room.id == data.idRoom);

    let found_message = found_room.messages.find(mess => mess.idMessage == data.idMessageToDelete);
    found_message.status = "deleted";
  
    console.log("------- Found Message to delete---------");
    console.log(found_message);

    socketIo.to(data.idRoom).emit("chat-message-2", 
      found_room.messages
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(rooms);
});

server.listen(port, async () => {
  await connect();
  console.log(`Example app on for port ${port}`);
});