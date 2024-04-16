import axios from "axios";
import host from "../../GlobalVariable";
const createRoom = async (users, name) => {
  try {
    const userData = {
      users: users,
      name: name,
    };
    const response = await axios.post(
      host.api_host + "/rooms/create-room",
      userData
    );
    console.log(userData);
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