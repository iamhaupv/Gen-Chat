import host from "../GlobalVariables";
import axios from "axios";
const removeRequestSend = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumber: phoneNumberUserSend,
      phoneRemove: phoneNumberUserGet,
    };
    const response = await axios.post(
      host.api_host + "/users/remove-request-send",
      userData
    );
    if (response.status === 200) {
      console.log("Remove request send successful:", response.data);

      return response.data;
    } else {
      console.error("Remove request send failed:", response.data);
      throw new Error("Remove request send failed");
    }
  } catch (error) {
    console.error("Remove request send error:", error);
    throw new Error(error);
  }
};
export default removeRequestSend;
