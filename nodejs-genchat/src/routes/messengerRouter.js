const express = require("express");
const { messengerController } = require("../controllers/index");
const router = express.Router();
// createMessenger
router.post("/createMessenger", messengerController.createMessenger);
//
module.exports = router;
