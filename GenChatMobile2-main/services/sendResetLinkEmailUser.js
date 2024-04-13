import axios from "axios";
//
const sendResetLinkEmail = async (email) => {
  try {
    const userData = {
      email: email
    };
    const response = await axios.post("https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/users/sendResetLinkEmail", userData);
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
