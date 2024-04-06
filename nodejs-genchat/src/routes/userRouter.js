const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { userController } = require("../controllers/index");
const { s3, bucketName, upload } = require("../config/aws.config");
//
router.post("/login", userController.login);
// url register
router.post("/register", userController.register);
// url sendResetLinkEmail
router.post("/sendResetLinkEmail", userController.sendResetLinkEmail);
// url reset
router.post("/reset", userController.reset);
// getInfor
router.get("/getInfor", userController.getInfor);
// update userInfor
router.patch("/update", userController.updateUserInfo);
// uploadImage
router.post("/uploadAvatar", upload.single("image"), userController.uploadAvatar);
// delete
router.delete("/deleteUser", userController.deleteUser);
// findUserByPhoneNumber
router.post("/findUserByPhoneNumber", userController.findUserByPhoneNumber);
// addFriend
router.post("/addFriend", userController.addFriend);
// addRequestSend
router.post("/addRequestSend", userController.addRequestSend);
// addRequestGet
router.post("/addRequestGet", userController.addRequestGet);
module.exports = router;
