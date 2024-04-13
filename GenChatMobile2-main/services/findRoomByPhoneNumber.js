import axios from "axios";
const findRoomByPhoneNumber = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/rooms/findRoomByPhoneNumber",
      userData
    );
    if (response.status === 200) {
      console.log("Found room by phone successful:", response.data);

      return response.data;
    } else {
      console.error("Found room by phone failed:", response.data);
      throw new Error("Found room by phone failed");
    }
  } catch (error) {
    console.error("Found room by phone error:", error);
    throw new Error(error);
  }
};
export default findRoomByPhoneNumber;