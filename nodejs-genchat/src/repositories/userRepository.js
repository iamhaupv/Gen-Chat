const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/mailer");
// login (đăng nhập)
const login = async ({ phoneNumber, password }) => {
  let existUser;
  try {
    existUser = await User.findOne({ phoneNumber }).exec();
  } catch (error) {
    console.log("Error " + error);
  }
  if (existUser) {
    let isMatch = await bcrypt.compare(password, existUser.password);
    if (!!isMatch) {
      let token = jwt.sign(
        {
          data: existUser,
        },
        // process.env.JWT_SECRET,
        "Pham Van Hau",
        {
          expiresIn: "10 days",
        }
      );
      return {
        ...existUser.toObject(),
        token: token,
      };
    } else {
      throw new Error("Wrong username or password");
    }
  } else {
    throw new Error("Wrong username or password");
  }
};
// register (đăng ký)
const register = async ({
  name,
  email,
  password,
  phoneNumber,
  photoURL,
  address,
  listFriend,
  listRequestSend,
  listRequestGet,
}) => {
  try {
    const existUser = await User.findOne({ phoneNumber }).exec(); // tìm kiếm dựa trên số diện thoại hoặc email
    if (!!existUser) {
      throw new Error("User exist!");
    }
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      photoURL,
      address,
      listFriend,
      listRequestSend,
      listRequestGet,
      messages: [],
    });
    bcrypt
      .hash(newUser.email, parseInt(process.env.SALT_ROUNDS))
      .then((hashedEmail) => {
        // console.log(
        //   `${process.env.APP_URL}/verify?email=${newUser.email}&token=${hashedEmail}`
        // );
        mailer.sendMail(
          newUser.email,
          "Verify Email",
          // `<a href="${process.env.APP_URL}/verify?email=${newUser.email}&token=${hashedEmail}"> Verify </a>`
          `<h1>Register Successfully!</h1>`
        );
      });
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Cannot User!");
  }
};
// getInfor (tìm theo phoneNumber)
const getInfor = async (phoneNumber) => {
  try {
    // Tìm người dùng dựa trên số điện thoại
    const existUser = await User.findOne({ phoneNumber }).exec();
    // Nếu người dùng không tồn tại, ném ra một lỗi
    if (!existUser) {
      throw new Error("User is not exist!");
    }
    // Trả về thông tin của người dùng
    return existUser;
  } catch (error) {
    // Bắt và xử lý lỗi
    console.error(error);
    throw error; // Chuyển tiếp lỗi để nơi gọi hàm có thể xử lý
  }
};
// findUserByPhoneNumber (tìm theo phoneNumber)
const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    // Tìm người dùng dựa trên số điện thoại
    const existUser = await User.findOne({ phoneNumber }).exec();
    // Nếu người dùng không tồn tại, ném ra một lỗi
    if (!existUser) {
      throw new Error("User is not exist!");
    }
    // Trả về thông tin của người dùng
    return existUser;
  } catch (error) {
    // Bắt và xử lý lỗi
    console.error("Find user by phone number failed: " + error);
    throw error; // Chuyển tiếp lỗi để nơi gọi hàm có  thể xử lý
  }
};
// update cập nhật lại các trường trong user
const update = async (userData) => {
  try {
    // Lấy thông tin người dùng dựa trên _id hoặc bất kỳ trường thông tin nào khác
    const {
      phoneNumber,
      email,
      name,
      address,
      listFriend,
      listRequestSend,
      listRequestGet,
    } = userData;
    // Kiểm tra xem có trường thông tin nào được cung cấp không
    if (
      !phoneNumber &&
      !email &&
      !name &&
      !address &&
      !listFriend &&
      !listRequestSend &&
      !listRequestGet
    ) {
      throw new Error("Missing user identification information!");
    }
    // Tìm và cập nhật thông tin người dùng
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber }, // Tìm kiếm dựa trên số điện thoại
      userData, // Dữ liệu cần cập nhật
      { new: true } // Tùy chọn để trả về bản ghi được cập nhật
    );

    // Kiểm tra xem người dùng đã được cập nhật thành công hay không
    if (!updatedUser) {
      throw new Error("User not found or unable to update user information!");
    }

    // Trả về thông tin người dùng sau khi được cập nhật
    return updatedUser;
  } catch (error) {
    // Bắt và xử lý lỗi
    console.error(error);
    throw error; // Chuyển tiếp lỗi để nơi gọi hàm có thể xử lý tiếp
  }
};
// deleteUser xóa collection user trong db
const deleteUser = async (phoneNumber) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (user) {
      await User.deleteOne({ phoneNumber });
    } else {
      throw new Error("Cannot found User");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// khi accept thì phone trong listRequestGet sẽ được vào listFriend và xóa phone khỏi listRequestGet
const acceptRequestGet = async (phoneNumber, phoneNumberUserGet, roomId) => {
  try {
    // Tìm kiếm người dùng
    const user = await User.findOne({ phoneNumber });
    console.log(user);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    // Kiểm tra xem số điện thoại mới có tồn tại trong danh sách bạn bè không
    if (user.listFriend.includes(phoneNumberUserGet)) {
      console.log("Số điện thoại đã tồn tại trong danh sách bạn bè.");
      return; // Không thêm số điện thoại đã tồn tại
    }
    // Thêm số điện thoại mới vào danh sách bạn bè
    // user.listFriend.push(phoneNumberUserGet);
    const updatedUser = await User.findOneAndUpdate(
      // Điều kiện: tìm người dùng bằng số điện thoại
      { phoneNumber },
      // Cập nhật:
      //   - listFriend: thêm phoneNumberUserGet vào danh sách bạn bè
      //   - $pull: loại bỏ phoneNumberUserGet khỏi listRequestGet
      {
        $push: {
          listFriend: {
            friend_id: phoneNumberUserGet,
            room_id: roomId,
          },
        },
        $pull: { listRequestGet: phoneNumberUserGet },
      },
      // Tùy chọn: trả về bản ghi đã cập nhật
      { new: true }
    );
    // Xóa phoneNumberUserGet trong listRequestGet của user
    // await User.findOneAndUpdate(
    //   { phoneNumber },
    //   { $pull: { listRequestGet: phoneNumber } }
    // );
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// khi accept thì phone trong listRequestSend sẽ được thêm vào listFriend và xóa phone khỏi listRequestSend
const acceptRequestSend = async (phoneNumber, phoneNumberUserGet, roomId) => {
  try {
    // Tìm kiếm người dùng
    const user = await User.findOne({ phoneNumber: phoneNumber });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    // Kiểm tra xem số điện thoại mới có tồn tại trong danh sách bạn bè không
    if (user.listFriend.includes(phoneNumberUserGet)) {
      console.log("Số điện thoại đã tồn tại trong danh sách bạn bè.");
      return; // Không thêm số điện thoại đã tồn tại
    }
    // Thêm số điện thoại mới vào danh sách bạn bè
    // user.listFriend.push(phoneNumberUserGet);
    const updatedUser = await User.findOneAndUpdate(
      // Điều kiện: tìm người dùng bằng số điện thoại
      { phoneNumber },
      // Cập nhật:
      //   - listFriend: thêm phoneNumberUserGet vào danh sách bạn bè
      //   - $pull: loại bỏ phoneNumberUserGet khỏi listRequestGet
      {
        $push: {
          listFriend: {
            friend_id: phoneNumberUserGet,
            room_id: roomId,
          },
        },
        $pull: { listRequestSend: phoneNumberUserGet },
      },
      // Tùy chọn: trả về bản ghi đã cập nhật
      { new: true }
    );
    // Xóa phoneNumberUserGet trong listRequestGet của user
    // await User.findOneAndUpdate(
    //   { phoneNumber },
    //   { $pull: { listRequestGet: phoneNumber } }
    // );
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// gửi request thì thêm vào listRequestSend (danh sách gửi lời mời kết bạn)
const addRequestSend = async (phoneNumber, phoneNumberUserGet) => {
  try {
    // Tìm kiếm người dùng
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    // Kiểm tra xem số điện thoại mới có tồn tại trong danh sách bạn bè không
    if (user.listRequestSend.includes(phoneNumberUserGet)) {
      console.log("Số điện thoại đã tồn tại trong danh sách bạn bè.");
      return; // Không thêm số điện thoại đã tồn tại
    }
    // Thêm số điện thoại mới vào danh sách bạn bè
    user.listRequestSend.push(phoneNumberUserGet);
    // Cập nhật bản ghi người dùng với danh sách bạn bè mới
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber },
      { listRequestSend: user.listRequestSend },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// gửi request thì thêm vào listRequetGet (danh sách lời mời kết bạn)
const addRequestGet = async (phoneNumber, phoneNumberUserGet) => {
  try {
    // Tìm kiếm người dùng
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }
    // Kiểm tra xem số điện thoại mới có tồn tại trong danh sách bạn bè không
    if (user.listRequestGet.includes(phoneNumberUserGet)) {
      console.log("Số điện thoại đã tồn tại trong danh sách bạn bè.");
      return; // Không thêm số điện thoại đã tồn tại
    }
    // Thêm số điện thoại mới vào danh sách bạn bè
    user.listRequestGet.push(phoneNumberUserGet);
    // Cập nhật bản ghi người dùng với danh sách bạn bè mới
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber },
      { listRequestGet: user.listRequestGet },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// lấy toàn bộ phone trong listRequestGet (danh sách lời mời kết bạn) để render gồm 2 option accept, delete
const getRequestGet = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new Error();
  } else {
    return user.listRequestGet;
  }
};
// lấy toàn bộ phone trong getRequestSend (danh sách lời mời kết bạn) để render gồm 2 option accept, delete
const getRequestSend = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new Error();
  } else {
    return user.listRequestSend;
  }
};
// delete request send xóa phone trong listRequestSend
const removeRequestSend = async (phoneNumber, phoneNumberRemove) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    const phoneExist = user.listRequestSend.includes(phoneNumberRemove);
    if (!phoneExist) {
      throw new Error("Phone not exist!");
    }
    await User.updateOne(
      { phoneNumber },
      { $pull: { listRequestSend: phoneNumberRemove } }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// delete request send xóa phone trong listRequestGet
const removeRequestGet = async (phoneNumber, phoneNumberRemove) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    const phoneExist = user.listRequestGet.includes(phoneNumberRemove);
    if (!phoneExist) {
      throw new Error("Phone not exist!");
    }
    await User.updateOne(
      { phoneNumber },
      { $pull: { listRequestGet: phoneNumberRemove } }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// delete friend xóa phone trong listFriend của cả 2 bên
const removeFriend = async (phoneNumber, phoneRemove) => {
  try {
    console.log(phoneNumber + " " + phoneRemove);
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    const phone = user.listFriend.find(
      (friend) => friend.friend_id == phoneRemove
    );
    if (!phone) {
      throw new Error("Phone is not exist!");
    }
    await User.findOneAndUpdate(
      { phoneNumber },
      { $pull: { listFriend: phone } }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// get List Friend
const getListFriend = async (phoneNumber) => {
  const user = await User.findOne({ phoneNumber });
  if (!user) {
    throw new Error();
  } else {
    return user.listFriend;
  }
};
// change password by phoneNumber
const changePassword = async (phoneNumber, newPassword) => {
  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    const hashPassword = await bcrypt.hash(
      newPassword,
      parseInt(process.env.SALT_ROUNDS)
    );
    await user.updateOne({ password: hashPassword });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// get all users
const getAllUser = async () => {
  try {
    const users = await User.find().exec(); // Fetch all users
    return users;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  changePassword,
  getListFriend,
  getRequestSend,
  removeFriend,
  removeRequestGet,
  removeRequestSend,
  acceptRequestGet,
  acceptRequestSend,
  addRequestGet,
  addRequestSend,
  getRequestGet,
  findUserByPhoneNumber,
  deleteUser,
  update,
  login,
  register,
  getInfor,
  getAllUser,
};
