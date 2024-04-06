const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require("../utils/mailer");
// login
const login = async ({ phoneNumber, password }) => {
  let existUser = await User.findOne({ phoneNumber }).exec();
  if (existUser) {
    let isMatch = await bcrypt.compare(password, existUser.password);
    if (!!isMatch) {
      let token = jwt.sign(
        {
          data: existUser,
        },
        process.env.JWT_SECRET,
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
// register
const register = async ({
  name,
  email,
  password,
  phoneNumber,
  photoURL,
  address,
  listFriend,
  listRequestSend,
  listRequestGet
}) => {
  // console.log("------------------------------");
  // console.log(email);
  // console.log(password);
  // console.log("------------------------------");
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
      listFriend: [],
      listRequestSend: [],
      listRequestGet: [] 
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
// getInfor
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
// findUserByPhoneNumber
const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    // Tìm người dùng dựa trên số điện thoại
    const existUser = await User.findOne({ phoneNumber }).exec();
    console.log(phoneNumber);
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
// update
const update = async (userData) => {
  try {
    // Lấy thông tin người dùng dựa trên _id hoặc bất kỳ trường thông tin nào khác
    const { phoneNumber, email, name, address, listFriend, listRequestSend, listRequestGet } = userData;
    // Kiểm tra xem có trường thông tin nào được cung cấp không
    if (!phoneNumber && !email && !name && !address && !listFriend && !listRequestSend && !listRequestGet) {
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
// delete
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
// add friend
const addFriend = async (phoneNumber, phoneNumberUserGet) => {
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
    user.listFriend.push(phoneNumberUserGet);

    // Cập nhật bản ghi người dùng với danh sách bạn bè mới
    const updatedUser = await User.findOneAndUpdate(
      { phoneNumber },
      { listFriend: user.listFriend },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const addRequestSend = async (phoneNumber, phoneNumberUserGet) => {
  try {
    // Tìm kiếm người dùng

    const user = await User.findOne({ phoneNumber });
    console.log(user);

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
const addRequestGet = async (phoneNumber, phoneNumberUserGet) => {
  try {
    // Tìm kiếm người dùng

    const user = await User.findOne({ phoneNumber });
    console.log(user);

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
const getRequestSend = async (phoneNumber, phoneNumberUserGet) => {
  try {
    // Tìm kiếm người dùng

    const user = await User.findOne({ phoneNumber });
    console.log(user);

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
const getRequestGet = async (phoneNumber) => {
  try {
    // Tìm kiếm người dùng

    const user = await User.findOne({ phoneNumber });
    console.log(user);

    if (!user) {
      throw new Error("Người dùng không tồn tại");
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
module.exports = {
  addRequestGet,
  addRequestSend,
  getRequestGet, 
  getRequestSend, 
  addFriend,
  findUserByPhoneNumber,
  deleteUser,
  update,
  login,
  register,
  getInfor,
};
