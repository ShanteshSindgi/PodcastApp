const express = require("express");
const router = express.Router();
const audiobookController = require("./../controllers/audiobookController");

router.post("/addAudioBook", audiobookController.addAudiobook);
router.put("/addEpsode/:audioBookId", audiobookController.AddaudioEpsodes);
router.put(
  "/addCommentAudiobook/:audioBookId",
  audiobookController.addCommentAudiobook
);
router.put(
  "/addCommentResponseAudiobook/:audioBookId",
  audiobookController.addCommentResponseAudiobook
);
router.put(
  "/addcommentEpsode/:audioBookId",
  audiobookController.addcommentEpsode
);
router.put(
  "/addCommentResponseEpsode/:audioBookId",
  audiobookController.addCommentResponseEpsode
);
router.put(
  "/subscribeAudioBook/:audioBookId",
  audiobookController.subscribeAudioBook
);
router.put(
  "/unsubscribeAudioBook/:audioBookId",
  audiobookController.unsubscribeAudioBook
);
router.put("/viewAudioBook/:audioBookId", audiobookController.viewAudioBook);
router.put(
  "/likesAudioBookComment/:audioBookId",
  audiobookController.likesAudioBookComment
);
router.put(
  "/unlikesAudioBookComment/:audioBookId",
  audiobookController.unlikesAudioBookComment
);
router.put(
  "/likesAudioBookResponseComment/:audioBookId",
  audiobookController.likesAudioBookResponseComment
);

router.put(
  "/unlikesAudioBookResponseComment/:audioBookId",
  audiobookController.unlikesAudioBookResponseComment
);

router.put(
  "/likesEpsodeComment/:audioBookId",
  audiobookController.likesEpsodeComment
);
router.put(
  "/unlikesEpsodeComment/:audioBookId",
  audiobookController.unlikesEpsodeComment
);
router.put(
  "/likesEpsodeResponseComment/:audioBookId",
  audiobookController.likesEpsodeResponseComment
);
router.put(
  "/unlikesEpsodeResponseComment/:audioBookId",
  audiobookController.unlikesEpsodeResponseComment
);

router.get("/listofAudioBooks", audiobookController.listofAudioBooks);
router.put(
  "/verifiyAudioBook/:audioBookId",
  audiobookController.verifiyAudioBook
);
router.put(
  "/BlockunBlockAudioBook/:audioBookId",
  audiobookController.BlockunBlockAudioBook
);
router.delete(
  "/deleteAudioBook/:audioBookId",
  audiobookController.deleteAudioBook
);
router.delete("/deleteEpsode/:audioBookId", audiobookController.deleteEpsode);

router.put("/editAudioBook/:audioBookId", audiobookController.editAudioBook);

router.put("/editEpsode/:audioBookId", audiobookController.editEpsode);

module.exports = router;
