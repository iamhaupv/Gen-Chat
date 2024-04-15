import axios from "axios";
import {api_host, socket_host} from "../../GlobalVariable";
const deleteMessenger = async (_id) => {
  try {
    const userData = {
     _id: _id
    };
    const response = await axios.post(
      api_host + "/messengers/delete-message-by-id",
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
export default deleteMessenger;