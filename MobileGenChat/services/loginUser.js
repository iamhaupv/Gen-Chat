import host from "../GlobalVariables";
import axios from "axios";
const loginUser = async (phoneNumber, password) => {
  console.log("Login user");
  console.log(phoneNumber);
  console.log(password);
    try {
      const userData = {
        phoneNumber: phoneNumber,
        password: password,
      };
      const response = await axios.post(host.api_host + "/users/login", userData);
      if (response.status === 200) {
        // console.log("Login successful:", response.data);
        
        return response.data;
      } else {
        console.error("Client Login failed:", response.data);
        throw new Error("Client Login failed");
      }
    } catch (error) {
      console.error("Client Login error:", error);
      throw new Error(error);
    }
  };
export default loginUser;
