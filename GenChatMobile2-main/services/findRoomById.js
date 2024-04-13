import axios from "axios";
const findRoomByRoomId = async (roomId) => {
  try {
    const userData = {
        roomId: roomId
    };
    const response = await axios.post(
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/rooms/findRoomByRoomId",
      userData
    );
    if (response.status === 200) {
      console.log("Found room successful:", response.data);

      return response.data;
    } else {
      console.error("Found room failed:", response.data);
      throw new Error("Found room failed");
    }
  } catch (error) {
    console.error("Found room error:", error);
    throw new Error(error);
  }
};
export default findRoomByRoomId;