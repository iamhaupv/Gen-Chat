const { Messenger, User } = require("../models/index");

// const createMessenger = async (sender, receiver, message, createdAt) => {
//   try {
//     const mess = await Messenger.create({
//       sender,
//       receiver,
//       message,
//       createdAt,
//     });
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };
const createMessenger = async (
  phoneNumberSender,
  phoneNumberreceiver,
  message,
  createdAt
) => {
  try {
    // Tìm người gửi và người nhận từ cơ sở dữ liệu
    const sender = await User.findOne({ phoneNumber: phoneNumberSender });
    const receiver = await User.findOne({ phoneNumber: phoneNumberreceiver });

    if (!sender || !receiver) {
      throw new Error("Sender or receiver not found.");
    }
    // Tạo tin nhắn mới và lưu trực tiếp vào cơ sở dữ liệu
    const newMessage = await Messenger.create({
      sender: sender.phoneNumber, // Đảm bảo rằng schema của User lưu trữ _id
      receiver: receiver.phoneNumber,
      message: message,
      createdAt: createdAt,
    });
    await sender.updateOne(
      { $push: { messages: newMessage._id } }
    );
    return newMessage;
  } catch (error) {
    console.error("Error creating messenger:", error);
    throw new Error(error.message);
  }
};

module.exports = {
  createMessenger,
};
