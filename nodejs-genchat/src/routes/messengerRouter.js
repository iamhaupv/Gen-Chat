const express = require("express");
const { messengerController } = require("../controllers/index");
const router = express.Router();
const {upload} = require("../config/aws.config")
// createMessenger
router.post("/create-message", messengerController.createMessenger);
// send file text
router.post("/send-file", upload.single("file"), messengerController.sendFile);
// delete message by id
router.post("/delete-message-by-id", messengerController.deleteMessenger)
module.exports = router;
