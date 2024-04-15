const { messengerRepository } = require("../repositories/index");
const { Messenger } = require("../models/index");
const { bucketName, s3 } = require("../config/aws.config");
//
const createMessenger = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const mess = await messengerRepository.createMessenger(
      sender,
      receiver,
      message
    );
    res.status(200).json({
      message: "Create Message Successfully!",
      data: mess,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot create messenger!",
    });
  }
};
// send file text
const sendFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file.originalname.split(".");
    const fileType = file[file.length - 1];
    const filePath = `${Date.now().toString()}.${fileType}`;

    const paramsS3 = {
      Bucket: bucketName,
      Key: filePath,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    s3.upload(paramsS3, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to upload file to S3" });
      }
      const fileURL = data.Location;
      const { sender, receiver } = req.body;
      const messageContent = { type: "file", content: fileURL };
      await messengerRepository.createMessenger(sender, receiver, messageContent);
      res.status(200).json({ message: "File uploaded successfully", fileURL });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// delete messenger
const deleteMessenger = async (req, res) => {
  try {
    const { _id } = req.body;
    await messengerRepository.deleteMessenger(_id);
    res.status(200).json({
      message: "Delete message successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot delele message!",
    });
  }
};
module.exports = {
  deleteMessenger,
  sendFile,
  createMessenger,
};
