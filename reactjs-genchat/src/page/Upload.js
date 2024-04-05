import React, { useState } from "react";
import uploadImage from "../services/uploadImage";

const UploadImageForm = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFileChange = (event) => {
    // Lấy thông tin về tệp tin đã chọn từ sự kiện onChange của input type="file"
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của sự kiện gửi
    setIsLoading(true); // Bắt đầu hiển thị biểu tượng tải

    try {
      if (image) {
        // Gọi hàm uploadImage với tệp tin đã chọn
        await uploadImage(image);
        setSuccessMessage("Upload successful!");
      } else {
        setErrorMessage("Please select an image.");
      }
    } catch (error) {
      setErrorMessage("Upload error: " + error.message);
    }

    setIsLoading(false); // Dừng hiển thị biểu tượng tải
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Input để chọn tệp tin */}
        <input type="file" name="image" onChange={handleFileChange} />
        
        {/* Nút gửi */}
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {/* Hiển thị thông báo thành công */}
      {successMessage && <div>{successMessage}</div>}

      {/* Hiển thị thông báo lỗi */}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
};

export default UploadImageForm;
