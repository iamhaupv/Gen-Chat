const { Room, User } = require("../models/index");
const generateID = () => Math.random().toString(36).substring(2, 10);
const createRoom = async (users, relationship) => {
  try {
    const roomId = generateID();
    await Room.create({
      users,
      roomId,
      relationship,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// findRoomByPhoneNumber
const findRoomByPhoneNumber = async (phoneNumber) => {
  try {
    const room = await Room.findOne({ phoneNumber });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// findRoomByManyPhoneNumber
const findRoomByManyPhoneNumber = async (users) => {
  try {
    const room = await Room.findOne({ users: { $all: users } });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// findRoomByRoomId
const findRoomByRoomId = async (roomId) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// delete room by id
const deleteRoomByRoomId = async (roomId) => {
  try {
    const room = await Room.findOneAndDelete({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// join room by roomId
const joinRoomByRoomId = async (roomId, phoneNumber) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    // kiểm tra xem người dùng đã tham gia vào phòng hay chưa
    if (room.users.includes(phoneNumber)) {
      throw new Error("User has joined this room!");
    }
    room.users.push(phoneNumber);
    user.rooms.push(roomId)
    await room.save();
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
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
