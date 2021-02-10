const express = require("express");
const router = express.Router();
const featureareaController = require("./../controllers/featureareaController");

router.post("/addNewFeatureArea", featureareaController.AddnewFeatureArea);
router.get("/fetchAllFeatureArea", featureareaController.fetchAllFeatureArea);
<<<<<<< HEAD
router.get("/");
=======
router.get("/fetchAllFeatureAreaWithoutMedia", featureareaController.fetchAllFeatureAreaWithoutMedia);
>>>>>>> 3efe2ba04966957c1a32864f9ea7e2701da35bf9
router.put("/addNewMedia/:featureId", featureareaController.addNewMedia);
router.delete("/removeMedia/:featureId", featureareaController.removeMedia);

router.delete(
  "/deleteFeatureArea/:featureId",
  featureareaController.deleteFeatureArea
);
module.exports = router;