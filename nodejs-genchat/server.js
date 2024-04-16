const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 2002;
// const port =  4040;
const { userRouter, messengerRouter, roomRouter} = require("./src/routes/index");
const connect = require("./src/databases/mongodb");
const checkToken = require("./src/authentication/auththentication");
const cors = require("cors")
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
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
// nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 

let messages = [];

let rooms = []

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on('sendUserIdToServer', user => {
    // console.log("----------------------------------------");
    // console.log("New user connected: ");
    // console.log(user.phoneNumber);
    // console.log("Friend list of that user");
    // console.log(user.listFriend);

    socket.on(user.phoneNumber, data => {
    console.log("----------------------------------------");
    console.log("Listening on " + user.phoneNumber);
      console.log("Message data");
      console.log(data);
      data.id = new Date().valueOf();
      messages.push(data);
      console.log("Array messages");
      console.log(messages);
      // socketIo.emit(data.receiver, { data });
      // socketIo.emit(data.sender, { data });
      socketIo.emit(data.receiver, messages);
      socketIo.emit(data.sender, messages);
    })

    // for (let i = 0; i < user.listFriend.length; i++) {
    // console.log("----------------------------------------");
    // console.log("Friends phone number");
    //   console.log(user.listFriend[i]);

    //   socket.emit(user.listFriend[i], `You are connected to user ${user.phoneNumber}`);
    //   // socket.emit("1", `You are connected to user ${user.listFriend[i]}`);
    // }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on("deleteMessage", idMessage => {
    let messageToDelete = messages.findIndex(x => x.id === idMessage);

    // console.log("Want to Delete message");
    // console.log(messageToDelete);

    if (messageToDelete != -1)
      messages[ messages.findIndex(x => x.id === idMessage) ].status = "deleted";

    console.log("New message after deleted");
    console.log(messages);

    // socketIo.emit(messageToDelete.receiver, messages);
    // socketIo.emit(messageToDelete.sender, messages);
  });

  socket.on("createRoom", data => {
    console.log("Called create room");
    console.log(data);

    let room = {
      id: "room" + new Date().valueOf(), 
      name: data.roomName, 
      users: data.users, 
      messages: [

      ]
    }
    
    rooms.push(room);
    
    socket.emit("returnRoom", room.id)
  });
});

server.listen(port, async () => {
  await connect();
  console.log(`Example app on for port ${port}`);
});
