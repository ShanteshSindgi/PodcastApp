const multer = require("../middleware/multerMiddle");
const { uuid } = require("uuidv4");
exports.uploadAudio = async (req, res) => {
  //aws Upload movies
  if (!req.file) {
    res.status(404).json({ message: "invalid uploaded_file param" });
  } else {
    const myFile = req.file.originalname.split(".");
    const fileType = myFile[myFile.length - 1];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    };
    multer.s3
      .upload(params, (error, data) => {
        if (error) {
          res.status(500).send(error);
          console.log(error);
        }
        res.status(200).json({ message: "file uploaded", url: data.Location });
      })
      .on("httpUploadProgress", function (evt) {
        console.log(
          "Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
        //   res.send("progress");
      });
  }
};
