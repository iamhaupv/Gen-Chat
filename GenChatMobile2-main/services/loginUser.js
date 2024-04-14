<<<<<<< HEAD
=======
import host from "../GlobalVariables";
>>>>>>> 82b0d8ffc51ca7a5b097d18c6acd35b496e38379
import axios from "axios";
const loginUser = async (phoneNumber, password) => {
    try {
      const userData = {
        phoneNumber: phoneNumber,
        password: password,
      };
<<<<<<< HEAD
      const response = await axios.post("http://localhost:6969/users/login", userData);
=======
      const response = await axios.post(host.api_host + "/users/login", userData);
>>>>>>> 82b0d8ffc51ca7a5b097d18c6acd35b496e38379
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
