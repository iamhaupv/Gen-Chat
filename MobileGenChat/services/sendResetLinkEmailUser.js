import host from "../GlobalVariables";
import axios from "axios";
//
const sendResetLinkEmail = async (email) => {
  try {
    const userData = {
      email: email
    };
    const response = await axios.post(host.api_host + "/users/sendResetLinkEmail", userData);
    if (response.status === 200) {
      console.log("Send reset link email successful:", response.data);
      return response.data;
    } else {
      console.error("Send reset link email failed:", response.data);
      throw new Error("Send reset link email failed");
    }
  } catch (error) {
    console.error("Send reset link email error:", error);
    throw new Error(error);
  }
};

export default sendResetLinkEmail;
