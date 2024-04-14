import axios from "axios";
import {api_host, socket_host} from "../GlobalVariable";
const createRoom = async (users, relationship) => {
  try {
    const userData = {
      users: users,
      relationship: relationship,
    };
    const response = await axios.post(
      api_host + "/rooms/createRoom",
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
export default createRoom;