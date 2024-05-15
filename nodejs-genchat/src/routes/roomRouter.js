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
// join room by roomId
router.post("/join-room-by-roomId", roomController.joinRoomByRoomId)
// update room infor
router.post("/update-room-infor", roomController.updateInforRoom)
// authorization room owner 
router.post("/authorization-room-owner", roomController.authorizationRoomOwner);
// authorization room leader
router.post("/authorization-room-leader", roomController.authorizationRoomLeader);
// authorization room members 
router.post("/authorization-room-members", roomController.authorizationRoomMembers);
// remove member out group
router.post("/remove-member-out-group", roomController.removeMemberOutGroup)
// remove elder out group
router.post("/remove-owner-out-group", roomController.removeOwnerOutGroup)
// remove leader out group
router.post("/remove-leader-out-group", roomController.removeLeaderOutGroup)
module.exports = router;
