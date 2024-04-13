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

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on('sendUserIdToServer', user => {
    // console.log("New user connected: ");
    // console.log(user);

    socket.on(user.phoneNumber, data => {
      console.log("Listening on " + user.phoneNumber);
      socketIo.emit("sendDataServer", { data });
    })
  });

  socket.on("disconnect", () => {
    // Khi client disconnect thì log ra terminal.
    console.log("Client disconnected");
  });
});

server.listen(port, async () => {
  await connect();
  console.log(`Example app on for port ${port}`);
});
