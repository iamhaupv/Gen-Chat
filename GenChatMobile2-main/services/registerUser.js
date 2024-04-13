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
      "https://a1c9-2001-ee0-50c4-3bf0-e871-bbf9-63f4-d1bd.ngrok-free.app/users/register",
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
