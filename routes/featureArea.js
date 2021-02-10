const express = require("express");
const router = express.Router();
const featureareaController = require("./../controllers/featureareaController");

router.post("/addNewFeatureArea", featureareaController.AddnewFeatureArea);
router.get("/fetchAllFeatureArea", featureareaController.fetchAllFeatureArea);
router.get("/fetchAllFeatureAreaWithoutMedia", featureareaController.fetchAllFeatureAreaWithoutMedia);
router.put("/addNewMedia/:featureId", featureareaController.addNewMedia);
router.delete("/removeMedia/:featureId", featureareaController.removeMedia);

router.delete(
  "/deleteFeatureArea/:featureId",
  featureareaController.deleteFeatureArea
);
module.exports = router;