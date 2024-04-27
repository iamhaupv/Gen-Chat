import host from "../GlobalVariables";
import axios from "axios";
const findRoomByPhoneNumber = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      host.api_host + "/rooms/findRoomByPhoneNumber",
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