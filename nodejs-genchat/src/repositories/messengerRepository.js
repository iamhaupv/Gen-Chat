const { Messenger, User } = require("../models/index");
// create messenger
// const createMessenger = async (sender, receiver, message) => {
//   try {
//     // Tìm người gửi và người nhận từ cơ sở dữ liệu
//     const userSender = await User.findOne({ phoneNumber: sender });
//     const userReceiver = await User.findOne({ phoneNumber: receiver });
//     if (!userSender || !userReceiver) {
//       throw new Error("Sender or recevier not found.");
//     }
//     // Tạo tin nhắn mới và lưu trực tiếp vào cơ sở dữ liệu
//     const newMessage = await Messenger.create({
//       sender: sender, // Đảm bảo rằng schema của User lưu trữ _id
//       receiver: receiver,
//       message: message,
//       createdAt: Date.now(),
//     });
//     // userReceiver.messageReceiver.phone.push(receiver);
//     // userReceiver.messageReceiver.message.push(newMessage._id);
//     // userSender.messageSender.phone.push(sender);
//     // userSender.messageSender.message.push(newMessage._id);
//     userSender.messageSender.push({ phone: sender, mess: [newMessage._id] });
//     userReceiver.messageReceiver.push({
//       phone: receiver,
//       mess: [newMessage._id],
//     });
//     await userReceiver.save();
//     await userSender.save();
//     return newMessage;
//   } catch (error) {
//     console.error("Error creating messenger:", error);
//     throw new Error(error.message);
//   }
// };
const createMessenger = async (sender, receiver, message) => {
  try {
    // Tìm người gửi và người nhận từ cơ sở dữ liệu
    const userSender = await User.findOne({ phoneNumber: sender });
    const userReceiver = await User.findOne({ phoneNumber: receiver });
    if (!userSender || !userReceiver) {
      throw new Error("Người gửi hoặc người nhận không tồn tại.");
    }

    // Tạo tin nhắn mới và lưu trực tiếp vào cơ sở dữ liệu
    const newMessage = await Messenger.create({
      sender: sender,
      receiver: receiver,
      message: message,
      createdAt: Date.now(),
    });

    // // Thêm tin nhắn mới vào hồ sơ của người nhận
    // addToMessageReceiver(userReceiver, sender, newMessage._id);
    
    // // Thêm tin nhắn mới vào hồ sơ của người gửi
    // addToMessageSender(userSender, receiver, newMessage._id);

    // // Lưu thay đổi vào cơ sở dữ liệu
    // await Promise.all([userReceiver.save(), userSender.save()]);

    return newMessage;
  } catch (error) {
    console.error("Lỗi khi tạo tin nhắn:", error);
    throw new Error(error.message);
  }
};

// Hàm phụ để kiểm tra và thêm tin nhắn mới vào mảng messageReceiver của người nhận
const addToMessageReceiver = (userReceiver, receiver, messageId) => {
  const existingReceiverIndex = userReceiver.messageReceiver.findIndex(
    (item) => item.phone === receiver
  );
  if (existingReceiverIndex !== -1) {
    userReceiver.messageReceiver[existingReceiverIndex].mess.push(messageId);
  } else {
    userReceiver.messageReceiver.push({ phone: receiver, mess: [messageId] });
  }
};

// Hàm phụ để kiểm tra và thêm tin nhắn mới vào mảng messageSender của người gửi
const addToMessageSender = (userSender, sender, messageId) => {
  const existingSenderIndex = userSender.messageSender.findIndex(
    (item) => item.phone === sender
  );
  if (existingSenderIndex !== -1) {
    userSender.messageSender[existingSenderIndex].mess.push(messageId);
  } else {
    userSender.messageSender.push({ phone: sender, mess: [messageId] });
  }
};

// delete Messenger
const deleteMessenger = async (_id) => {
  try {
    const message = Messenger.findOne({ _id });
    console.log(message);
    if (!message) {
      throw new Error("Message is not exist!");
    }
    return await Messenger.deleteOne({ _id });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
module.exports = {
  deleteMessenger,
  createMessenger,
};
