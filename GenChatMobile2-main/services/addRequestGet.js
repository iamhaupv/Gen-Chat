import axios from "axios";
const addRequestGet = async (phoneNumberUserSend, phoneNumberUserGet) => {
  try {
    const userData = {
      phoneNumberUserSend: phoneNumberUserSend,
      phoneNumberUserGet: phoneNumberUserGet,
    };
    const response = await axios.post(
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/users/addRequestGet",
      userData
    );
    if (response.status === 200) {
      console.log("Add request get successful:", response.data);

      return response.data;
    } else {
      console.error("Add request get failed:", response.data);
      throw new Error("Add request get failed");
    }
  } catch (error) {
    console.error("Add request get error:", error);
    throw new Error(error);
  }
};
export default addRequestGet;
