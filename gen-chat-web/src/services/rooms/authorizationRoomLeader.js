import axios from "axios";

import host from "../../GlobalVariable";
const authorizationRoomLeader = async (roomId, phoneNumber) => {
  try {
    const userData = {
      roomId: roomId,
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      host.api_host + "/rooms/authorization-room-leader",
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
export default authorizationRoomLeader;