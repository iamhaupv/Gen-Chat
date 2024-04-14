const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    roomId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    users: [
      {
        type: String,
        ref: "User", // Assuming there's a User model defined
      },
    ],
    roles: {
      leader: {
        type: String,
        required: false,
      },
      elders: [
        {
          type: String,
          required: false,
        },
      ],
      members: [
        {
          type: String,
          required: false,
        },
      ],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  })
);

module.exports = Room;
