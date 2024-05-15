const { roomRepository } = require("../repositories/index");
// create room
const createRoom = async (req, res) => {
  try {
    const { name, users, updateAt } = req.body;
    const room = await roomRepository.createRoom(name, users, updateAt);
    res.status(200).json({
      message: "Successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot create room!",
    });
  }
};
// findRoomByPhoneNumber
const findRoomByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log(req.body);
    const room = await roomRepository.findRoomByPhoneNumber(phoneNumber);
    // const room = await roomRepository.findRoomByPhoneNumber({users:{$in:[phoneNumber]}})
    console.log();
    res.status(200).json({
      message: "Successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Room is not exist!",
    });
  }
};
// findRoomByManyPhoneNumber
const findRoomByManyPhoneNumber = async (req, res) => {
  try {
    const { users } = req.body;
    const room = await roomRepository.findRoomByManyPhoneNumber(users);
    res.status(200).json({
      message: "Successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Not Found!",
    });
  }
};
// findRoomByRoomId
const findRoomByRoomId = async (req, res) => {
  try {
    const { roomId } = req.body;
    const room = await roomRepository.findRoomByRoomId(roomId);
    res.status(200).json({
      message: "Successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Room is not exist!",
    });
  }
};
// delete room by roomId
const deleteRoomByRoomId = async (req, res) => {
  try {
    const { roomId } = req.body;
    await roomRepository.deleteRoomByRoomId(roomId);
    res.status(200).json({
      message: "Delete room successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot delete room!",
    });
  }
};
// join room by roomId
const joinRoomByRoomId = async (req, res) => {
  try {
    const { roomId, phoneNumber } = req.body;
    const room = await roomRepository.joinRoomByRoomId(roomId, phoneNumber);

    res.status(200).json({
      message: "Join room successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot join this room!",
    });
  }
};
// update room infor by roomId
const updateInforRoom = async (req, res) => {
  try {
    const { roomId, name } = req.body;
    const updateAt = Date.now();
    const room = await roomRepository.updateInforRoom(roomId, {
      name,
      updateAt,
    });
    res.status(200).json({
      message: "Update room infor successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot update room infor!",
    });
  }
};
// authorization room owner
const authorizationRoomOwner = async (req, res) => {
  try {
    const { roomId, phoneNumber } = req.body;
    const room = await roomRepository.authorizationRoomOwner(
      roomId,
      phoneNumber
    );
    res.status(200).json({
      message: "Authorization room owner successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot authorization room owner!",
    });
  }
};
// authorization room leader
const authorizationRoomLeader = async (req, res) => {
  try {
    const { phoneAuth, roomId, phoneNumber } = req.body;
    const room = await roomRepository.authorizationRoomLeader(
      phoneAuth,
      roomId,
      phoneNumber
    );
    res.status(200).json({
      message: "Authorization room leaders successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot authorization room leaders!",
    });
  }
};
// authorization room members
const authorizationRoomMembers = async (req, res) => {
  try {
    const { phoneAuth, roomId, phoneNumber } = req.body;
    const room = await roomRepository.authorizationRoomMembers(
      phoneAuth,
      roomId,
      phoneNumber
    );
    res.status(200).json({
      message: "Authorization room members successfully!",
      data: room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot authorization room members!",
    });
  }
};
// remove member out group
const removeMemberOutGroup = async (req, res) => {
  try {
    const { phoneAuth, roomId, phoneNumber } = req.body;
    const remove = await roomRepository.removeMemberOutGroup(
      phoneAuth,
      roomId,
      phoneNumber
    );
    res.status(200).json({
      message: "Remove member out group successfully!",
      data: remove,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot remove member out group!",
    });
  }
};
// remove leader out group
const removeLeaderOutGroup = async (req, res) => {
  try {
    const { phoneAuth, roomId, phoneNumber } = req.body;
    const remove = await roomRepository.removeLeaderOutGroup(
      phoneAuth,
      roomId,
      phoneNumber
    );
    res.status(200).json({
      message: "Remove member out group successfully!",
      data: remove,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot remove member out group!",
    });
  }
};
const removeOwnerOutGroup = async (req, res) => {
  try {
    const { roomId, phoneNumber } = req.body;
    const remove = await roomRepository.removeOwnerOutGroup(
      roomId,
      phoneNumber
    );
    res.status(200).json({
      message: "Remove member out group successfully!",
      data: remove,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot remove member out group!",
    });
  }
};
module.exports = {
  removeLeaderOutGroup,
  removeOwnerOutGroup,
  removeMemberOutGroup,
  authorizationRoomMembers,
  authorizationRoomLeader,
  authorizationRoomOwner,
  updateInforRoom,
  joinRoomByRoomId,
  deleteRoomByRoomId,
  findRoomByRoomId,
  findRoomByManyPhoneNumber,
  findRoomByPhoneNumber,
  createRoom,
};
