import host from "../GlobalVariables";
import axios from "axios";
const findRoomByManyPhoneNumber = async (users) => {
  try {
    const userData = {
      users: users
    };
    const response = await axios.post(
      host.api_host + "/rooms/findRoomByManyPhoneNumber",
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