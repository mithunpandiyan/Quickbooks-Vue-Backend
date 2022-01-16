const util = require("util");
const multer = require("multer");
// const maxSize = 2 * 1024 * 1024;
 
const path = require("path")
const filePath = path.join(__dirname, "../../assets/upload/customer/")

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


let uploadFile = multer({
  storage,
  limits: { fileSize: 20000000 },
}).any("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;