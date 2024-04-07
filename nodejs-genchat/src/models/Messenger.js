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
      type: String,
      required: true,
    },
    sentAt: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = Messenger;
