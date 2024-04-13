import host from "../GlobalVariables";
import axios from "axios";
const findUserByPhoneNumber = async (phoneNumber) => {
  console.log("Phone number");
  console.log(phoneNumber);
  try {

    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      host.api_host + "/users/findUserByPhoneNumber",
      userData
    );
    if (response.status === 200) {
      console.log("Found user by phone number successful:", response.data);

      return response.data;
    } else {
      console.error("Found user by phone number failed:", response.data);
      throw new Error("Found user by phone number failed");
    }
  } catch (error) {
    console.error("Found user by phone number error:", error);
    throw new Error(error);
  }
};
export default findUserByPhoneNumber;
