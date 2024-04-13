import axios from "axios";
const findRoomByManyPhoneNumber = async (users) => {
  try {
    const userData = {
      users: users
    };
    const response = await axios.post(
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/rooms/findRoomByManyPhoneNumber",
      userData
    );
    if (response.status === 200) {
      console.log("Found room by many phone successful:", response.data);

      return response.data;
    } else {
      console.error("Found room by many phone failed:", response.data);
      throw new Error("Found room by many phone failed");
    }
  } catch (error) {
    console.error("Found room by many phone error:", error);
    throw new Error(error);
  }
};
export default findRoomByManyPhoneNumber;