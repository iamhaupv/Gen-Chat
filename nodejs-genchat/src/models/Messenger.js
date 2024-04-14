const mongoose = require("mongoose");

const Messenger = mongoose.model(
  "Messenger",
  new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
    receiver: {
      type: String,
      ref: "User",
      required: true,
    },
    message: {
      type: {
        type: String, // Loại dữ liệu của message
        enum: ["text", "file"], // Các loại dữ liệu được chấp nhận
      },
      content: {
        type: String, // Dữ liệu thực sự của message
      },
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Messenger;
