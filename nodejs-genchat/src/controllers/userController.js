const { EventEmitter } = require("node:events");
const { userRepository } = require("../repositories/index");
const { validationResult } = require("express-validator");
const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const mailer = require("../utils/mailer");
const { upload, s3, bucketName } = require("../config/aws.config");
//
const myEvent = new EventEmitter();
myEvent.on("event.register.user", (params) => {
  console.log(`${JSON.stringify(params)}`);
});
//
const login = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(500).json({
      error: error.array,
    });
  }
  const { phoneNumber, password } = req.body;
  try {
    let existUser = await userRepository.login({
      phoneNumber,
      password,
    });
    res.status(200).json({
      message: "Login successfully!",
      data: existUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Wrong username or password",
    });
  }
};

//
const register = async (req, res) => {
  const { name, email, password, phoneNumber, photoURL, address, listFriend, listRequestSend, listRequestGet } = req.body;
  myEvent.emit("event.register.user", {
    name,
    email,
    password,
    phoneNumber,
    photoURL,
    address,
    listFriend,
    listRequestSend, listRequestGet
  });
  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      photoURL,
      address,
      listFriend,
      listRequestSend, listRequestGet
    });
    res.status(200).json({
      message: "Register Successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot Register",
    });
  }
};
//
const verify = (req, res) => {
  bcrypt.compare(req.query.email, req.query.token, (err, result) => {
    if (result == true) {
      User.verify(req.query.email, (err, result) => {
        if (!err) {
          res.status(200).json({
            message: "Successfully!",
          });
        } else {
          res.status(500).json({
            message: "Cannot verify!",
          });
        }
      });
    } else {
      res.redirect("/404");
    }
  });
};
const sendResetLinkEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(500).json({
      message: "Cannot found email!",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "Cannot found user!",
      });
    }

    const hashedEmail = await bcrypt.hash(
      user.email,
      parseInt(process.env.SALT_ROUNDS)
    );
    await mailer.sendMail(
      user.email,
      "Reset password",
      `<a href="${process.env.APP_URL}/users/reset/?token=${hashedEmail}"> Reset Password </a>`
    );
    // console.log(`${process.env.APP_URL}/users/reset/?token=${hashedEmail}`);
    return res.status(200).json({
      message: "Send Email Successfully!",
    });
  } catch (error) {
    console.error("Error sending reset link email:", error);
    return res.status(500).json({
      message: "Error",
    });
  }
};
const reset = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = req.query.token;
    console.log(email, token, password);
    if (!email || !token || !password) {
      return res.send("Error!");
    }
    // Kiểm tra xem email và token có khớp hay không
    const user = await User.findOne({ email, resetToken: token });
    if (!user) {
      return res.send("Error!");
    }
    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    await User.updateOne({ email }, { password: hashedPassword });
    return res.status(200).json({
      message: "Successfully!",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      message: "Error!",
    });
  }
};
const getInfor = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await userRepository.getInfor(phoneNumber);
    res.status(200).json({
      message: "Successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User not exist!",
    });
  }
};
const updateUserInfo = async (req, res) => {
  try {
    const { phoneNumber, email, name, address, listFriend, listRequestSend, listRequestGet } = req.body;
    // Gọi hàm update để cập nhật thông tin người dùng
    const updatedUser = await userRepository.update({
      phoneNumber,
      email,
      name,
      address,
      listFriend,
      listRequestSend, 
      listRequestGet
    });
    // Trả về phản hồi thành công
    res.status(200).json({
      success: true,
      message: "User information updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error updating user information:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user information",
      error: error.message,
    });
  }
};
const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const image = req.file?.originalname.split("."); // tạo ra mảng image chứa các chứa các thành phần sau khi được tách bằng . vd avt.jpg [avt, jgp]
    const fileType = image[image.length - 1]; // lấy phần tử cuối cùng của mảng img tức là lấy phần mở rộng của file
    const filePath = `${Date.now().toString()}.${fileType}`; // tên của ảnh trên s3 id_ngaygiohientai.phanmorongcuafile
    const { phoneNumber } = req.body;
    // Kiểm tra xem có người dùng nào đã có photoURL hay không
    const userWithEmptyPhotoURL = await User.findOne({
      phoneNumber: phoneNumber,
      photoURL: null,
    });
    if (!userWithEmptyPhotoURL) {
      const userWithEmptyPhotoURL = await User.findOne({
        phoneNumber: phoneNumber,
      });
      console.log("111");
      const params = {
        Bucket: bucketName,
        Key: userWithEmptyPhotoURL.photoURL.split("/").pop(), // Lấy tên file từ URL
      };
      await s3.deleteObject(params).promise();
      const paramsS3 = {
        Bucket: bucketName,
        Key: filePath,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      s3.upload(paramsS3, async (err, data) => {
        const imageURL = data.Location; // chứa url của tập tin sau khi được up lên s3
        const user = await User.updateOne({
          photoURL: imageURL,
        });
        res.status(200).json({
          message: "Successfully!",
          data: user,
        });
      });
    } else {
      const paramsS3 = {
        Bucket: bucketName,
        Key: filePath,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };
      s3.upload(paramsS3, async (err, data) => {
        const imageURL = data.Location; // chứa url của tập tin sau khi được up lên s3
        const user = await User.updateOne({
          photoURL: imageURL,
        });
        res.status(200).json({
          message: "Successfully!",
          data: user,
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot add image",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    await userRepository.deleteUser(phoneNumber);
    res.status(200).json({
      message: "Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Cannot find phoneNumber",
    });
  }
};
const findUserByPhoneNumber = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await userRepository.findUserByPhoneNumber(phoneNumber);
    res.status(200).json({
      message: "Successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "User not exist!",
    });
  }
};
const addFriend = async (req, res) => {
  try {
    const { phoneNumberUserSend, phoneNumberUserGet } = req.body;
    console.log("2", phoneNumberUserSend)
    await userRepository.addFriend(phoneNumberUserSend, phoneNumberUserGet);
    res.status(200).json({
      message: "Add Friend Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
    });
  }
};
const addRequestSend = async (req, res) => {
  try {
    const { phoneNumberUserSend, phoneNumberUserGet } = req.body;
    console.log("2", phoneNumberUserSend)
    await userRepository.addRequestSend(phoneNumberUserSend, phoneNumberUserGet);
    res.status(200).json({
      message: "Add Friend Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
    });
  }
};
const addRequestGet = async (req, res) => {
  try {
    const { phoneNumberUserSend, phoneNumberUserGet } = req.body;
    console.log("2", phoneNumberUserSend)
    await userRepository.addRequestGet(phoneNumberUserSend, phoneNumberUserGet);
    res.status(200).json({
      message: "Add Friend Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error",
    });
  }
};
module.exports = {
  addRequestGet,
  addRequestSend,
  addFriend,
  findUserByPhoneNumber,
  deleteUser,
  uploadAvatar,
  updateUserInfo,
  getInfor,
  verify,
  sendResetLinkEmail,
  reset,
  login,
  register,
};
