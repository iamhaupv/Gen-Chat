import axios from "axios";
const getListFriend = async (phoneNumberUserSend) => {
  try {
    const userData = {
      phoneNumber: phoneNumberUserSend,
    };
    const response = await axios.post(
      "http://localhost:6969/users/getListFriend",
      userData
    );
    if (response.status === 200) {
      console.log("Found successful:", response.data);

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
export default getListFriend;
