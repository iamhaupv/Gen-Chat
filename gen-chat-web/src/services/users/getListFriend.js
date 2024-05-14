import axios from "axios";
import host from "../../GlobalVariable";
const getListFriend = async (phoneNumberUserSend) => {
  try {
    const userData = {
      phoneNumber: phoneNumberUserSend,
    };
    const response = await axios.post(
      host.api_host + "/users/get-list-friend",
      userData
    );
    if (response.status === 200) {
      // console.log("Found successful:", response.data.data);

      return response.data.data;
    } else {
      console.error("Found failed:", response.data);
      throw new Error("Found failed");
    }
  } catch (error) {
    console.error("Found error:", error);
    throw new Error(error);
  }
};
export default getListFriend;
