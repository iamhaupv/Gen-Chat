import host from "../GlobalVariables";
import axios from "axios";
const getInfor = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      host.api_host + "/users/getInfor",
      userData
    );
    if (response.status === 200) {
      console.log("Get info successfully!:", response.data);

      return response.data;
    } else {
      console.error("Get info send failed:", response.data);
      throw new Error("Get info send failed");
    }
  } catch (error) {
    console.error("Get info send error:", error);
    throw new Error(error);
  }
};
export default getInfor;
