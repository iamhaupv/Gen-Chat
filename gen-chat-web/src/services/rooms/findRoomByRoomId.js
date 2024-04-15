import {api_host, socket_host} from "../../GlobalVariable";
import axios from "axios";
const findRoomByRoomId = async (roomId) => {
  try {
    const userData = {
        roomId: roomId
    };
    const response = await axios.post(
      api_host + "/rooms/find-room-by-roomId",
      userData
    );
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
export default findRoomByRoomId;