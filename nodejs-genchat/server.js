const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2002;
const { userRouter, messengerRouter} = require("./src/routes/index");
const connect = require("./src/databases/mongodb");
const checkToken = require("./src/authentication/auththentication");
const cors = require("cors")
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
