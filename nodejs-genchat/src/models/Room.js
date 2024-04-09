const mongoose = require("mongoose");

const Room = mongoose.model(
  "Room",
  new mongoose.Schema({
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    roomId: {
      type: String,
      required: true
    },
    users: [
      {
        type: String,
        ref: "User", // Assuming there's a User model defined
      },
    ],
    relationship: {
      type: String,
      required: false,
    },
  })
);

module.exports = Room;
