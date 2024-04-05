const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageURL: String,
});

const Mess = mongoose.model("Mess", userSchema);
module.exports = Mess;