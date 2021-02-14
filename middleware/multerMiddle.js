const AWS = require("aws-sdk");
const multer = require("multer");

exports.s3 = new AWS.S3({
  accessKeyId: process.env.AWSACCESS_KEY,
  secretAccessKey: process.env.AWSSECRET_KEY,
});
//    console.log(process.env.accessKeyId);
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});
exports.upload = multer({ storage }).single("uploaded_file");
