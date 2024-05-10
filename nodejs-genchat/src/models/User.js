const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { type } = require("os");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: {
      type: mongoose.ObjectId,
    },
    name: {
      type: String,
      required: false,
      // validate: {
      //   validator: (value) => value.length > 3,
      //   message: "Username must be at least 3 characters!",
      // },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => isEmail,
        message: "Email is incorrect form!",
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    photoURL: {
      type: String,
      required: false,
    },
    listFriend: [
      {
        friend_id: {
          type: String, 
          required: true,
        }, 
        room_id: {
          type: String, 
          required: true,
        }
      }
    ], 
    listRequestSend: {
      type: [String],
      required: false,
    },
    listRequestGet: {
      type: [String],
      required: false,
    },
    messageReceiver: [
      {
        phone: {
          type: String,
          required: true,
        },
        mess: [
          {
            type: String,
            required: true,
            ref: "Messenger",
          },
        ],
      },
    ],
    messageSender: [
      {
        phone: {
          type: String,
          required: true,
        },
        mess: [
          {
            type: String,
            required: true,
            ref: "Messenger",
          },
        ],
      },
    ],
    rooms: [
      {
        type: String,
        requred: false,
        ref: "Room",
      },
    ],
  })
);
User.methods = {
  isCorrectPassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },
  createPasswordChangedToken: function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  },
};
module.exports = User;
