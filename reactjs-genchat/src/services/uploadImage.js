import axios from "axios";
//
const uploadImage = async (image) => {
  try {
    const userData = {
      image
    };
    const response = await axios.post("http://localhost:6969/uploadImage", userData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
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

export default uploadImage;
