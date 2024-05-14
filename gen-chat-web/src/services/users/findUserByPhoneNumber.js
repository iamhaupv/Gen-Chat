
import host from "../../GlobalVariable";
import axios from "axios";
const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      host.api_host + "/users/find-user-by-phoneNumber",
      userData
    );
    if (response.status === 200) {
      // console.log("Found successful:", response.data);

      return response.data;
    } else {
      console.error("Found failed:", response.data);
      throw new Error("Found failed");
    }
  } catch (error) {
    console.error("Found error:", error);
    throw new Error(error);
  }
};
export default findUserByPhoneNumber;
