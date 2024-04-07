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
router.post("/getInfor", userController.getInfor);
// update userInfor
router.patch("/update", userController.updateUserInfo);
// uploadImage
router.post("/uploadAvatar", upload.single("image"), userController.uploadAvatar);
// delete
router.delete("/deleteUser", userController.deleteUser);
// findUserByPhoneNumber
router.post("/findUserByPhoneNumber", userController.findUserByPhoneNumber);
// aceptFriend
router.post("/acceptFriend", userController.acceptFriend);
// addRequestSend
router.post("/addRequestSend", userController.addRequestSend);
// addRequestGet
router.post("/addRequestGet", userController.addRequestGet);
// getRequestGet
router.post("/getRequestGet", userController.getRequestGet);
// getRequestSend
router.post("/getRequestSend", userController.getRequestSend);
// acceptRequestGet
router.post("/acceptRequestGet", userController.acceptRequestGet);
// acceptRequestSend
router.post("/acceptRequestSend", userController.acceptRequestSend);
// removeRequestSend
router.post("/removeRequestSend", userController.removeRequestSend);
// removeRequestGet
router.post("/removeRequestGet", userController.removeRequestGet);
// removeFriend
router.post("/removeFriend", userController.removeFriend);
module.exports = router;
