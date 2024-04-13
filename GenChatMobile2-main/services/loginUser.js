import axios from "axios";
const loginUser = async (phoneNumber, password) => {
    try {
      const userData = {
        phoneNumber: phoneNumber,
        password: password,
      };
      const response = await axios.post("https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/users/login", userData);
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
