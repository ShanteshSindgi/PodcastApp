const express = require("express");
const router = express.Router();
const podcastmanagementController = require("./../controllers/prodcastManagementController");

router.get("/getpodcastbyusers", podcastmanagementController.getpodcastbyusers);
router.get("/getpodcast", podcastmanagementController.getpodcast);

module.exports = router;
