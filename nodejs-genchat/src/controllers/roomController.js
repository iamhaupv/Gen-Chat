const { roomRepository } = require("../repositories/index");

const createRoom = async (req, res) => {
  try {
    const { users, relationship } = req.body;
    await roomRepository.createRoom(users, relationship);
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
      data: room
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Room is not exist!",
    });
  }
};
// findRoomByManyPhoneNumber
const findRoomByManyPhoneNumber = async(req, res) =>{
  try {
    const {users} = req.body
    const room = await roomRepository.findRoomByManyPhoneNumber(users)
    res.status(200).json({
      message: "Successfully!",
      data: room
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Not Found!"
    })
  }
}
module.exports = {
  findRoomByManyPhoneNumber,
  findRoomByPhoneNumber,
  createRoom,
};
