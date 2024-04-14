const express = require("express");
const router = express.Router();
const {roomController} = require("../controllers/index")
// createRoom
router.post("/create-room", roomController.createRoom)
// findRoomByPhoneNumber
router.post("/find-room-by-phoneNumber", roomController.findRoomByPhoneNumber)
// findRoomByManyPhoneNumber
router.post("/find-room-by-many-phoneNumber", roomController.findRoomByManyPhoneNumber)
// findRoomByRoomId
router.post("/find-room-by-roomId", roomController.findRoomByRoomId)
// delete room by roomId
router.post("/delete-room-by-roomId", roomController.deleteRoomByRoomId)
module.exports = router;
