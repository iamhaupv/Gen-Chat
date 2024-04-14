const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path")
// config aws
process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = "1";
// config aws-sdk
AWS.config.update({
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});
// s3 service
const s3 = new AWS.S3();
// bucket name
const bucketName = process.env.S3_BUCKET_NAME;
// config multer
const storage = multer.memoryStorage({
  destination(req, file, cb) {
    cb(null, "");
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 200000000000 }, // giới hạn kích thước file là 2000000
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  const fileType = /jpeg|png|jpg|gif|txt|mp4|avi|mov|docx|pdf/; // chỉ nhận những file có đuôi .jpeg, .png, .jpg, .gif
  const extname = fileType.test(path.extname(file.originalname).toLowerCase()); // toLowerCase không phân biệt hoa thường, originalname là tên gốc của tệp tin khi người dùng up lên trình duyệt, extname là một phần của module path nó trích xuât phần mở rộng của tệp tin
  // const mimetype = fileType.test(file.mimetype); // mimetype là một chuổi được sử dụng để chỉ định loại nội dung của file hoặc dữ liệu trong môi trường internet
  if (extname) {
    return cb(null, true); // ok
  }
  return cb("Error /jpeg|png|jpg|gif|txt|mp4|avi|mov/");
}
module.exports = {
  bucketName,
  s3,
  upload,
};
