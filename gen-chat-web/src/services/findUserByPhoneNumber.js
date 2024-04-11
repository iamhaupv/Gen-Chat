import axios from "axios";
const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    const response = await axios.post(
      "http://localhost:6969/users/findUserByPhoneNumber",
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
export default findUserByPhoneNumber;
