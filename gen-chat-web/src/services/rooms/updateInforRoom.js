import axios from "axios";
import {api_host, socket_host} from "../../GlobalVariable";
const updateInforRoom = async (roomId, name) => {
  try {
    const userData = {
      roomId: roomId,
      name: name,
    };
    const response = await axios.post(
      api_host + "/rooms/update-room-infor",
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
export default updateInforRoom;