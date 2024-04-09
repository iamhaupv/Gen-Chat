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
module.exports = {
  createRoom,
};
