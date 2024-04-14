import host from "../GlobalVariables";
import axios from "axios";
const createRoom = async (users, relationship) => {
  try {
    const userData = {
      users: users,
      relationship: relationship,
    };
    const response = await axios.post(
      host.api_host + "/rooms/createRoom",
      userData
    );
    if (response.status === 200) {
      console.log("Create room successful:", response.data);

      return response.data;
    } else {
      console.error("Create room failed:", response.data);
      throw new Error("Create room failed");
    }
  } catch (error) {
    console.error("Create room error:", error);
    throw new Error(error);
  }
};
export default createRoom;