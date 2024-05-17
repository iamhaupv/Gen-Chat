import host from "../../GlobalVariable";
import axios from "axios";
const getInfor = async (phoneNumber) => {
  try {
    const userData = {
      phoneNumber: phoneNumber,
    };
    // const response = await axios.post(
    //   api_host + "/users/get-infor",
    //   userData
    // );
    const response = await axios.post(
      host.api_host + "/users/get-infor",
      userData
    );
    if (response.status === 200) {
      console.log("Get request send successfully!:", response.data);

      return response.data;
    } else {
      console.error("Get request send failed:", response.data);
      throw new Error("Get request send failed");
    }
  } catch (error) {
    console.error("Get request send error:", error);
    throw new Error(error);
  }
};
export default getInfor;
