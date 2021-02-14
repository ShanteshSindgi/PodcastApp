const express = require("express");
const router = express.Router();
const uploads3Controller = require("../controllers/uploads3Controller");
const upload = require("../middleware/multerMiddle");
/**
 * @swagger
 * /uploads3/uploadAudio:
 *    post:
 *      tags:
 *        - File Upload S3
 *      descriptions: Upload new Audio
 *      summary: Upload new Audio
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: formData
 *          name: uploaded_file
 *          type: file
 *          description: Audio file.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.post("/uploadAudio", upload.upload, uploads3Controller.uploadAudio);

module.exports = router;
