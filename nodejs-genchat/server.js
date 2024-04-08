const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2002;
const { userRouter, messengerRouter} = require("./src/routes/index");
const connect = require("./src/databases/mongodb");
const checkToken = require("./src/authentication/auththentication");
const cors = require("cors")
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const server = createServer(app);
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
app.listen(port, async () => {
  await connect();
  console.log(`Example app on for port ${port}`);
});
//
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

// -------------------------------------------------------------------------

// const express = require("express");
// const app = express();
// const PORT = 4000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const http = require("http").Server(app);
// const cors = require("cors");

// const socketIO = require('socket.io')(http, {
//   cors: {
//       origin: "<http://localhost:3000>"
//   }
// });

// socketIO.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on('disconnect', () => {
//     socket.disconnect()
//     console.log('🔥: A user disconnected');
//   });
// });

// app.get("/api", (req, res) => {
//     res.json({
//         message: "Hello world",
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });