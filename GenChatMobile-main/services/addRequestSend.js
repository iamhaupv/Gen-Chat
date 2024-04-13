import host from "../GlobalVariables";
import axios from "axios";
const addRequestSend = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumberUserSend: phoneNumberUserSend,
      phoneNumberUserGet: phoneNumberUserGet,
    };
    const response = await axios.post(
      host.api_host + "/users/addRequestSend",
      userData
    );
    if (response.status === 200) {
      console.log("Add request send successful:", response.data);

      return response.data;
    } else {
      console.error("Add request send failed:", response.data);
      throw new Error("Add request send failed");
    }
  } catch (error) {
    console.error("Add request send error:", error);
    throw new Error(error);
  }
};
export default addRequestSend;
