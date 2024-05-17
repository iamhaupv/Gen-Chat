import host from "../../GlobalVariable";
import axios from "axios";
const loginUser = async (phoneNumber, password) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
      password: password,
    };
    const response = await axios.post(host.api_host + "/users/login", userData);
    if (response.status === 200) {
      console.log("Login successful:", response.data);
      
      return response.data;
    } else {
      console.error("Login failed:", response.data);
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw new Error(error);
  }
};
export default loginUser;
