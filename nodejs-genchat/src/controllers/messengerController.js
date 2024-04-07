const { messengerRepository } = require("../repositories/index");
//
const createMessenger = async (req, res) => {
  try {
    const {sender, receiver, message, createdAt} = req.body
    const mess =  await messengerRepository.createMessenger(sender, receiver, message, createdAt);
    res.status(200).json({
      message: "Create Message Successfully!",
      data: mess
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot create messenger!",
    });
  }
};
//
module.exports = {
  createMessenger,
};
