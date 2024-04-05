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
router.delete("/deleteUser", userController.deleteUser);
module.exports = router;
