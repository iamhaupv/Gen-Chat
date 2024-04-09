const express = require("express");
const router = express.Router();
const {roomController} = require("../controllers/index")
// createRoom
router.post("/createRoom", roomController.createRoom)

module.exports = router;
