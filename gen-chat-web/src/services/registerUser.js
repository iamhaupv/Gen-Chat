import axios from "axios";
//
const registerUser = async (
  name,
  phoneNumber,
  password,
  email,
  photoURL,
  address,
  listFriend
) => {
  try {
    const userData = {
      name: name,
      phoneNumber: phoneNumber,
      password: password,
      email: email,
      photoURL,
      address,
      listFriend,
    };
    const response = await axios.post(
      "http://localhost:6969/users/register",
      userData
    );
    if (response.status === 200) {
      console.log("Registration successful:", response.data);
      return response.data;
    } else {
      console.error("Registration failed:", response.data);
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error);
  }
};

export default registerUser;
