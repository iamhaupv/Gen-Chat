const { register } = require('./src/repositories/userRepository')

const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
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

const socketIo = require("socket.io")(server, {
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

const generateID = () => Math.random().toString(36).substring(2, 10);

socketIo.on("connection", (socket) => {
  socket.on('sendUserIdToServer', user => {
    socketIo.emit(user.phoneNumber, messages);

    socket.on(user.phoneNumber, data => {
      console.log("----------------------------------------");
      console.log("Listening on " + user.phoneNumber);
      console.log("Message data");
      console.log(data);
      data.id = new Date().valueOf();
      messages.push(data);
      console.log("Array messages");
      console.log(messages);
      socketIo.emit(data.receiver, messages);
      socketIo.emit(data.sender, messages);
    })
  });

  socket.on("deleteMessage", idMessage => {
    let messageToDelete = messages.findIndex(x => x.id === idMessage);

    if (messageToDelete != -1)
      messages[ messages.findIndex(x => x.id === idMessage) ].status = "deleted";

    console.log("New message after deleted");
    console.log(messages);
  });

  console.log("New client connected" + socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Lang nghe CRUD tren group
socketIo_group.on("connection", (socket_group) => {
  socket_group.on('sendUserIdToServer', user => {
    console.log("Group: send user id to server");

    let sub_rooms = rooms.filter(room => {
      console.log(room);
      console.log(room.user);
      console.log(user.phoneNumber);
      console.log(room.user.includes(user.phoneNumber));
      return room.user.includes(user.phoneNumber) || room.admin == user.phoneNumber
    })
    
    console.log("Sub Room list");
    console.log(sub_rooms);

    socket_group.emit("roomsList", sub_rooms);
  });


  socket_group.on("createRoom", async room => {
    room.phoneNumber = generateID();
    room.messages = [];
    console.log("Current room");
    console.log(room);

    // let data = {
    //   name: room.name, 
    //   phoneNumber: generateID(), 
    //   email: room.name + "@gmail.com",
    //   password: generateID(),
    //   photoURL: "",
    //   address: "",
    //   listFriend: room.user,
    //   listRequestSend: [],
    //   listRequestGet: [],
    // }

    // console.log(data);
    // await register(data);

    rooms.unshift(room);

    socket_group.emit("roomsList", rooms);
  });

  // Handle khi có connect từ client tới
  console.log("Group: New client connected " + socket_group.id);

  socket_group.on("disconnect", () => {
    console.log("Group: Client disconnected");
  });
});

app.get("/api", (req, res) => {
  res.json(rooms);
});

server.listen(port, async () => {
  await connect();
  console.log(`Example app on for port ${port}`);
});

server_group.listen(port_group, async () => {
  await connect();
  console.log(`Example app on for port group ${port_group}`);
});
