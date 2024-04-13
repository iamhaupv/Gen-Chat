import axios from "axios";
const acceptFriend = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumberUserSend: phoneNumberUserSend,
      phoneNumberUserGet: phoneNumberUserGet,
    };
    const response = await axios.post(
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/users/acceptFriend",
      userData
    );
    if (response.status === 200) {
      console.log("Accept Friend successful:", response.data);

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
