import axios from "axios";
import host from "../../GlobalVariable";

const acceptFriend = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumberUserSend: phoneNumberUserSend,
      phoneNumberUserGet: phoneNumberUserGet,
    };
    const response = await axios.post(
      host.api_host + "/users/accept-friend",
      userData
    );
    if (response.status === 200) {
      // console.log("Accept Friend successful:", response.data);

      return response.data;
    } else {
      console.error("Accept Friend failed:", response.data);
      throw new Error("Accept Friend failed");
    }
  } catch (error) {
    console.error("Accept Friend error:", error);
    throw new Error(error);
  }
};
export default acceptFriend;
