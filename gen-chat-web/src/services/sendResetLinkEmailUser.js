import axios from "axios";
//
const sendResetLinkEmail = async (email) => {
  try {
    const userData = {
      email: email
    };
    const response = await axios.post("http://localhost:6969/users/sendResetLinkEmail", userData);
    if (response.status === 200) {
      console.log("Registration successful:", response.data);
      return response.data;
    } else {
      console.error("Registration failed:", response.data);
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error);
  }
};

export default sendResetLinkEmail;
