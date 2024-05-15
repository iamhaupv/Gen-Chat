const { Room, User } = require("../models/index");
const generateID = () => Math.random().toString(36).substring(2, 10);
// create room
const createRoom = async (name, users, updateAt) => {
  try {
    const roomId = generateID();
    if (users.length < 3) {
      throw new Error("At least 3 users required to create a room.");
    }
    for (const user of users) {
      const existingUser = await User.findOne({ phoneNumber: user });
      if (!existingUser) {
        throw new Error(`User with phone number ${user} does not exist.`);
      }
    }
    const owner = users[0]; // Lãnh đạo là người đầu tiên trong mảng
    const members = users.slice(1); // Các thành viên là các người còn lại trong mảng
    return await Room.create({
      users,
      roomId,
      name,
      roles: {
        owner,
        members,
      },
      createAt: Date.now(),
      updateAt,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// findRoomByPhoneNumber
const findRoomByPhoneNumber = async (phoneNumber) => {
  console.log("36: " + phoneNumber);
  try {
    // const room = await Room.findOne({ phoneNumber });
    const room = await Room.findOne({ users: { $in: 5 } });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    // console.log("42: " + room);
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// findRoomByManyPhoneNumber
const findRoomByManyPhoneNumber = async (users) => {
  try {
    const room = await Room.findOne({ users: { $all: users } });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// findRoomByRoomId
const findRoomByRoomId = async (roomId) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// delete room by id
const deleteRoomByRoomId = async (roomId) => {
  try {
    const room = await Room.findOneAndDelete({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// join room by roomId
const joinRoomByRoomId = async (roomId, phoneNumber) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    // kiểm tra xem người dùng đã tham gia vào phòng hay chưa
    if (room.users.includes(phoneNumber)) {
      throw new Error("User has joined this room!");
    }
    room.users.push(phoneNumber);
    user.rooms.push(roomId);

    // Thêm người dùng vào danh sách thành viên của phòng
    room.roles.members.push(phoneNumber);
    await room.save();
    await user.save();
    return room;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// authorization room
const authorizationRoomOwner = async (roomId, phoneNumber) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exists!");
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    // Xóa người dùng khỏi danh sách leader và member
    room.roles.leader = room.roles.leader.filter(
      (leader) => leader !== user.phoneNumber
    );
    room.roles.members = room.roles.members.filter(
      (member) => member !== user.phoneNumber
    );
    // Cập nhật trường owner
    room.roles.owner = user.phoneNumber;
    return await room.save();
  } catch (error) {
    console.log(error);
    throw error; // Throw lỗi ra bên ngoài hàm
  }
};
// update infor room
const updateInforRoom = async (roomId, newData) => {
  try {
    const { name, updateAt } = newData;
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    if (!name && !updateAt) {
      throw new Error("Missing room identification information!");
    }
    await Room.findOneAndUpdate({ roomId }, newData, { new: true });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
// authorization room leader
const authorizationRoomLeader = async (phoneAuth, roomId, phoneNumber) => {
  try {
    // Tìm kiếm thông tin phòng
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }

    // Kiểm tra xem người dùng phoneAuth có phải là owner của phòng hay không
    if (room.roles.owner !== phoneAuth) {
      throw new Error("You are not authorized to perform this action!");
    }

    // Tìm kiếm thông tin người dùng
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }

    // Kiểm tra xem người dùng đã là leader của phòng hay không
    const isLeader = room.roles.leader.includes(user.phoneNumber);
    if (!isLeader) {
      // Nếu người dùng chưa là leader, thực hiện thêm vào
      // Loại bỏ người dùng ra khỏi danh sách thành viên
      room.roles.members = room.roles.members.filter(
        (member) => member !== user.phoneNumber
      );
      // Thêm người dùng vào danh sách leader
      room.roles.leader.push(user.phoneNumber);
      // Lưu lại thông tin phòng
      return await room.save();
    } else {
      throw new Error("User is already a leader!");
    }
  } catch (error) {
    console.log(error);
    throw error; // Throw lỗi ra bên ngoài hàm
  }
};
// authorization room members
const authorizationRoomMembers = async (phoneAuth, roomId, phoneNumber) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }
    // Kiểm tra xem người dùng phoneAuth có phải là owner của phòng hay không
    if (room.roles.owner !== phoneAuth) {
      throw new Error("You are not authorized to perform this action!");
    }

    // Kiểm tra xem người dùng có trong danh sách leader hay không
    const isLeader = room.roles.leader.includes(user.phoneNumber);
    if (isLeader) {
      // Nếu người dùng là leader, loại bỏ người dùng ra khỏi danh sách leader
      room.roles.leader = room.roles.leader.filter(
        (leader) => leader !== user.phoneNumber
      );
      // Kiểm tra xem người dùng đã có trong danh sách thành viên hay chưa
      const isMember = room.roles.members.includes(user.phoneNumber);
      if (!isMember) {
        // Nếu người dùng không có trong danh sách thành viên, thêm vào danh sách
        room.roles.members.push(user.phoneNumber);
        // Lưu lại thông tin phòng
        await room.save();
      } else {
        throw new Error("User is already a member!");
      }
    } else {
      throw new Error("User is not a leader!");
    }

    // Trả về phòng sau khi cập nhật
    return room;
  } catch (error) {
    console.log(error);
    throw error; // Ném lỗi ra bên ngoài hàm
  }
};
// remove member out group
const removeMemberOutGroup = async (phoneAuth, roomId, phoneNumber) => {
  try {
    // Tìm kiếm thông tin phòng
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }

    // Kiểm tra xem người dùng phoneAuth có phải là owner hoặc leader của phòng hay không
    if (
      room.roles.owner !== phoneAuth &&
      !room.roles.leader.includes(phoneAuth)
    ) {
      throw new Error("You are not authorized to perform this action!");
    }

    // Tìm kiếm thông tin người dùng
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("User is not exist!");
    }

    // Loại bỏ người dùng ra khỏi danh sách users và members của phòng
    room.users.pull(user.phoneNumber);
    room.roles.members.pull(user.phoneNumber);
    // Lưu lại thông tin phòng
    await room.save();
    // Loại bỏ phòng ra khỏi danh sách rooms của người dùng
    user.rooms.pull(room.roomId);
    // Lưu lại thông tin người dùng
    await user.save();

    return room;
  } catch (error) {
    console.log(error);
    throw error; // Ném lỗi ra bên ngoài hàm
  }
};

// remove leader out group
const removeLeaderOutGroup = async (phoneAuth, roomId, phoneNumber) => {
  try {
    // Tìm kiếm thông tin phòng
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }

    // Kiểm tra xem người dùng phoneAuth có phải là owner của phòng hay không
    if (room.roles.owner !== phoneAuth) {
      throw new Error("You are not authorized to perform this action!");
    }

    // Kiểm tra xem người dùng phoneNumber là leader của phòng hay không
    if (room.roles.owner === phoneNumber) {
      throw new Error("Cannot remove owner out group");
    }

    // Kiểm tra xem người dùng có trong danh sách users của phòng hay không
    if (!room.users.includes(phoneNumber)) {
      throw new Error("This phone number is not a member of the group");
    }

    // Loại bỏ người dùng ra khỏi danh sách leader và danh sách users của phòng
    room.roles.leader = room.roles.leader.filter(
      (leader) => leader !== phoneNumber
    );
    room.users = room.users.filter((user) => user !== phoneNumber);

    // Lưu lại thông tin phòng
    await room.save();

    return room;
  } catch (error) {
    console.log(error);
    throw error; // Ném lỗi ra bên ngoài hàm
  }
};
// remove owner out group
const removeOwnerOutGroup = async (roomId, phoneNumber) => {
  try {
    const room = await Room.findOne({ roomId });
    if (!room) {
      throw new Error("Room is not exist!");
    }

    // Kiểm tra nếu người rời là owner
    if (room.roles.owner === phoneNumber) {
      // Nếu có người lãnh đạo phụ, chọn người lãnh đạo phụ đầu tiên làm lãnh đạo mới
      if (room.roles.leader.length > 0) {
        const newLeader = room.roles.leader[0];
        room.roles.owner = newLeader;
        room.roles.leader = room.roles.leader.filter(
          (leader) => leader !== newLeader
        );
      } else if (room.roles.members.length > 0) {
        // Nếu không có người lãnh đạo phụ, chọn người tham gia đầu tiên làm lãnh đạo mới
        const newLeader = room.roles.members[0];
        room.roles.owner = newLeader;
        room.roles.members = room.roles.members.filter(
          (member) => member !== newLeader
        );
      } else {
        // Nếu không có thành viên nào trong nhóm, xóa vai trò owner
        delete room.roles.owner;
      }

      // Xóa người rời khỏi danh sách người tham gia của nhóm
      room.users = room.users.filter((user) => user !== phoneNumber);

      // Nếu không còn thành viên nào trong nhóm, đặt vai trò của lãnh đạo về rỗng
      if (room.users.length === 0) {
        delete room.roles.owner;
        deleteRoomByRoomId(roomId);
      }

      return await room.save();
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  removeLeaderOutGroup,
  removeOwnerOutGroup,
  removeMemberOutGroup,
  authorizationRoomMembers,
  authorizationRoomLeader,
  authorizationRoomOwner,
  updateInforRoom,
  joinRoomByRoomId,
  deleteRoomByRoomId,
  findRoomByRoomId,
  findRoomByManyPhoneNumber,
  findRoomByPhoneNumber,
  createRoom,
};
