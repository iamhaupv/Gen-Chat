import axios from "axios";
import host from "../GlobalVariable";

const getCallToken = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber
    };

    console.log("---------- Phone number");
    console.log(phoneNumber);

    const response = await axios.post(
      host.api_host + "/createCallToken",
      userData
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Get token failed:", response.data);
      throw new Error("Get token failed");
    }
  } catch (error) {
    console.error("Get token error:", error);
    throw new Error(error);
  }
};
export default getCallToken;
