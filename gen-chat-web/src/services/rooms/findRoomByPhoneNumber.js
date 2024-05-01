import {api_host, socket_host} from "../../GlobalVariable";
import axios from "axios";
const findRoomByPhoneNumber = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      api_host + "/rooms/find-room-by-phoneNumber",
      phoneNumber
    );
    console.log(`12: ${response}`);
    if (response.status === 200) {
      console.log("Found successful:", response.data);

      return response.data;
    } else {
      console.error("Found failed:", response.data);
      throw new Error("Found failed");
    }
  } catch (error) {
    console.error("Found error:", error);
    throw new Error(error);
  }
};
export default findRoomByPhoneNumber;