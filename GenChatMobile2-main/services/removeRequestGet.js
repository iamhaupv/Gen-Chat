import host from "../GlobalVariables";
import axios from "axios";
const removeRequestGet = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumber: phoneNumberUserSend,
      phoneRemove: phoneNumberUserGet,
    };
    const response = await axios.post(
      host.api_host + "/users/removeRequestGet",
      userData
    );
    if (response.status === 200) {
      console.log("Remove request get successful:", response.data);

      return response.data;
    } else {
      console.error("Remove request get failed:", response.data);
      throw new Error("Remove request get failed");
    }
  } catch (error) {
    console.error("Remove request get error:", error);
    throw new Error(error);
  }
};
export default removeRequestGet;
