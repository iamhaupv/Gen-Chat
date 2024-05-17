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
router.post("/send-reset-link-email", userController.sendResetLinkEmail);
// url reset
router.post("/reset", userController.reset);
// getInfor
router.post("/get-infor", userController.getInfor);
// update userInfor
router.patch("/update", userController.updateUserInfo);
// uploadImage
router.post(
  "/upload-avatar",
  upload.single("image"),
  userController.uploadAvatar
);
// delete
router.delete("/delete-user", userController.deleteUser);
// findUserByPhoneNumber
router.post("/find-user-by-phoneNumber", userController.findUserByPhoneNumber);
// aceptFriend
router.post("/accept-friend", userController.acceptFriend);
// addRequestSend
router.post("/add-request-send", userController.addRequestSend);
// addRequestGet
router.post("/add-request-get", userController.addRequestGet);
// getRequestGet
router.post("/get-request-get", userController.getRequestGet);
// getRequestSend
router.post("/get-request-send", userController.getRequestSend);
// acceptRequestGet
router.post("/accept-request-get", userController.acceptRequestGet);
// acceptRequestSend
router.post("/accept-request-send", userController.acceptRequestSend);
// removeRequestSend
router.post("/remove-request-send", userController.removeRequestSend);
// removeRequestGet
router.post("/remove-request-get", userController.removeRequestGet);
// removeFriend
router.post("/remove-friend", userController.removeFriend);
// getListFriend
router.post("/get-list-friend", userController.getListFriend);
// changePassword
router.post("/change-password", userController.changePassword);
// get all users
router.post("/get-all-users", userController.getAllUser);
module.exports = router;
