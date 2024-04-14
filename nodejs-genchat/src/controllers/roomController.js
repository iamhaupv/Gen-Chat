const { roomRepository } = require("../repositories/index");
//
const createRoom = async (req, res) => {
  try {
    const { users, relationship, roomId } = req.body;
    await roomRepository.createRoom(users, roomId, relationship);
    res.status(200).json({
      message: "Successfully!",
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
    const room = await roomRepository.findRoomByPhoneNumber(phoneNumber);
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
    await roomRepository.joinRoomByRoomId(roomId, phoneNumber);
    res.status(200).json({
      message: "Join room successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot join this room!",
    });
  }
};
module.exports = {
  joinRoomByRoomId,
  deleteRoomByRoomId,
  findRoomByRoomId,
  findRoomByManyPhoneNumber,
  findRoomByPhoneNumber,
  createRoom,
};
