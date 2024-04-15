import axios from "axios";
import {api_host, socket_host} from "../../GlobalVariable";
const createMessenger = async (sender, receiver, message) => {
    // {
    //     "sender": "1",
    //     "receiver": "2",
    //      "message": {
    //     "type": "text",
    //     "content": "😊😊😊"
    //   }
    // }
  try {
    const userData = {
      sender: sender,
      receiver: receiver,
      message: message
    };
    const response = await axios.post(
      api_host + "/messengers/create-message",
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
export default createMessenger;