import {api_host, socket_host} from "../../GlobalVariable";
import axios from "axios";
const deleteRoomByRoomId = async (users) => {
  try {
    const userData = {
      users: users
    };
    const response = await axios.post(
      api_host + "/rooms/delete-room-by-roomId",
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
export default deleteRoomByRoomId;