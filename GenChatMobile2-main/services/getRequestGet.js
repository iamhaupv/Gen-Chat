import axios from "axios";
const getRequestGet = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/users/getRequestGet",
      userData
    );
    if (response.status === 200) {
      console.log("Get request get successfully!:", response.data);

      return response.data;
    } else {
      console.error("Get request get failed:", response.data);
      throw new Error("Get request get failed");
    }
  } catch (error) {
    console.error("Get request get error:", error);
    throw new Error(error);
  }
};
export default getRequestGet;
