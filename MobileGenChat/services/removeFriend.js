import host from "../GlobalVariables";
import axios from "axios";
const addRequestGet = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumberUserSend: phoneNumberUserSend,
      phoneNumberUserGet: phoneNumberUserGet,
    };
    const response = await axios.post(
      host.api_host + "/users/remove-friend",
      userData
    );
    if (response.status === 200) {
      console.log("Remove friend successful:", response.data);

      return response.data;
    } else {
      console.error("Remove friend failed:", response.data);
      throw new Error("Remove friend failed");
    }
  } catch (error) {
    console.error("Remove friend error:", error);
    throw new Error(error);
  }
};
export default addRequestGet;
