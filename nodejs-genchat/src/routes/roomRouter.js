const express = require("express");
const router = express.Router();
const {roomController} = require("../controllers/index")
// createRoom
router.post("/createRoom", roomController.createRoom)
// findRoomByPhoneNumber
router.post("/findRoomByPhoneNumber", roomController.findRoomByPhoneNumber)
// findRoomByManyPhoneNumber
router.post("/findRoomByManyPhoneNumber", roomController.findRoomByManyPhoneNumber)
// findRoomByRoomId
router.post("/findRoomByRoomId", roomController.findRoomByRoomId)
module.exports = router;
