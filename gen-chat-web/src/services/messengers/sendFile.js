import axios from "axios";
import {api_host, socket_host} from "../../GlobalVariable";
const sendFile = async (sender, receiver) => {
  try {
    const userData = {
      sender: sender,
      receiver: receiver,
    };
    const response = await axios.post(
      api_host + "/messengers/send-file",
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
export default sendFile;