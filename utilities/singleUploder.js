const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploader(subfolder_path, max_file_size, error_msg) {
  const upload_folder = path.join(
    __dirname,
    `../public/uploads/${subfolder_path}`
  );
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, upload_folder);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });
  //preapre final upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      cb(null, true);
    },
  });
  return upload;
}
module.exports = uploader;
