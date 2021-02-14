const express = require("express");
const router = express.Router();
const audiobookController = require("./../controllers/audiobookController");

/**
 * @swagger
 * /audiolist/addAudioBook:
 *    post:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add new AudioBook
 *      summary: Add new AudioBook by passing title,description,image,Tags And Uploader Id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Audio Book params.
 *          schema:
 *            type: object
 *            properties:
 *              audioTitle:
 *                type: string
 *              audioDescription:
 *                type: string
 *              audioImage:
 *                type: string
 *              userID:
 *                type: string
 *              audioTag:
 *                type: array
 *                items:
 *                  type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.post("/addAudioBook", audiobookController.addAudiobook);

/**
 * @swagger
 * /audiolist/addpodcast:
 *    post:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add new podcast
 *      summary: Add new podcast by passing title,description,image,Tags And Uploader Id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Audio Book params.
 *          schema:
 *            type: object
 *            properties:
 *              audioTitle:
 *                type: string
 *              audioDescription:
 *                type: string
 *              audioImage:
 *                type: string
 *              userID:
 *                type: string
 *              audioTag:
 *                type: array
 *                items:
 *                  type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.post("/addpodcast", audiobookController.addpodcast);

/**
 * @swagger
 * /audiolist/addEpisode/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add new Episode to Audio by passing title,description,streamUrl with audioId
 *      summary: Add new Episode to Audio by passing title,description,streamUrl with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio to add episode.
 *        - in: body
 *          name: body
 *          description: audio Episode Params.
 *          schema:
 *            type: object
 *            properties:
 *              title :
 *                type : string
 *              description :
 *                type : string
 *              episodeImage :
 *                type : string
 *              streamUrl :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/addEpisode/:audioId", audiobookController.AddaudioEpisode);

/**
 * @swagger
 * /audiolist/addCommentAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add new Comment to Audio by passing comment,userId with audioId
 *      summary: Add new Comment to Audio by passing comment,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: audio comment Params.
 *          schema:
 *            type: object
 *            properties:
 *              comment :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/addCommentAudio/:audioId", audiobookController.addCommentAudio);

/**
 * @swagger
 * /audiolist/addCommentResponseAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add response Comment to Audio by passing comment,parent CommentId,userId with audioId
 *      summary: Add response Comment to Audio by passing comment,parent CommentId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: audio comment Params.
 *          schema:
 *            type: object
 *            properties:
 *              commentId :
 *                type : string
 *              comment :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/addCommentResponseAudio/:audioId",
  audiobookController.addCommentResponseAudio
);

/**
 * @swagger
 * /audiolist/addcommentEpisode/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add  Comment to episode by passing comment,episodeId,userId with audioId
 *      summary: Add  Comment to episode by passing comment,episodeId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: episode comment params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *              comment :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/addcommentEpisode/:audioId",
  audiobookController.addcommentEpisode
);

/**
 * @swagger
 * /audiolist/addCommentResponseEpisode/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Add response Comment to episode by passing comment,episodeId,commentId,userId with audioId
 *      summary: Add response Comment to episode by passing comment,episodeId,commentId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: episode comment params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *              commentId :
 *                type : string
 *              comment :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/addCommentResponseEpisode/:audioId",
  audiobookController.addCommentResponseEpisode
);

/**
 * @swagger
 * /audiolist/subscribeAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Subscribe to Audio with audioId
 *      summary: Subscribe to Audio with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/subscribeAudio/:audioId", audiobookController.subscribeAudio);

/**
 * @swagger
 * /audiolist/unsubscribeAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Subscribe to Audio with audioId
 *      summary: Subscribe to Audio with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/unsubscribeAudio/:audioId", audiobookController.unsubscribeAudio);

/**
 * @swagger
 * /audiolist/unsubscribeAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Subscribe to Audio with audioId
 *      summary: Subscribe to Audio with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */
router.put("/viewAudio/:audioBookId", audiobookController.viewAudio);

/**
 * @swagger
 * /audiolist/likesAudioComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: like Audio Comment by passing commentId userId with audioId
 *      summary: like Audio Comment by passing commentId userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description:  params.
 *          schema:
 *            type: object
 *            properties:
 *              commentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */
router.put(
  "/likesAudioComment/:audioId",
  audiobookController.likesAudioComment
);

/**
 * @swagger
 * /audiolist/unlikesAudioComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: unlike Audio Comment by passing commentId userId with audioId
 *      summary: unlike Audio Comment by passing commentId userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              commentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/unlikesAudioComment/:audioId",
  audiobookController.unlikesAudioComment
);

/**
 * @swagger
 * /audiolist/likesAudioResponseComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: like Audio response comment by passing parent commentId,child commentId,userId with audioId
 *      summary: like Audio response comment by passing parent commentId,child commentId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              parentcommentId :
 *                type : string
 *              childCommentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/likesAudioResponseComment/:audioId",
  audiobookController.likesAudioResponseComment
);

/**
 * @swagger
 * /audiolist/unlikesAudioResponseComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: unlike Audio response comment by passing parent commentId,child commentId,userId with audioId
 *      summary: unlike Audio response comment by passing parent commentId,child commentId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              parentcommentId :
 *                type : string
 *              childCommentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/unlikesAudioResponseComment/:audioId",
  audiobookController.unlikesAudioResponseComment
);

/**
 * @swagger
 * /audiolist/likesEpisodeComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: like Audio episode response comment by passing commentId,episodeId,userId with audioId
 *      summary: like Audio episode response comment by passing commentId,episodeId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *              commentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/likesEpisodeComment/:audioId",
  audiobookController.likesEpisodeComment
);

/**
 * @swagger
 * /audiolist/unlikesEpisodeComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: unlike Audio episode response comment by passing commentId,episodeId,userId with audioId
 *      summary: unlike Audio episode response comment by passing commentId,episodeId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *              commentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/unlikesEpisodeComment/:audioId",
  audiobookController.unlikesEpisodeComment
);

/**
 * @swagger
 * /audiolist/likesEpisodeResponseComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: like Audio episode response comment by passing parent commentId,child commentId,,episodeId,userId with audioId
 *      summary: like Audio episode response comment by passing parent commentId,child commentId,,episodeId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *              parentcommentId :
 *                type : string
 *              childCommentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/likesEpisodeResponseComment/:audioId",
  audiobookController.likesEpisodeResponseComment
);
/**
 * @swagger
 * /audiolist/unlikesEpisodeResponseComment/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: unlike Audio episode response comment by passing parent commentId,child commentId,,episodeId,userId with audioId
 *      summary: unlike Audio episode response comment by passing parent commentId,child commentId,,episodeId,userId with audioId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *              parentcommentId :
 *                type : string
 *              childCommentId :
 *                type : string
 *              userID :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/unlikesEpisodeResponseComment/:audioId",
  audiobookController.unlikesEpisodeResponseComment
);

/**
 * @swagger
 * /audiolist/listofAudioBooks:
 *    get:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Fetch All AudioBooks
 *      summary: Fetch All AudioBooks by passing pagesize And current page for Pagination
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: pagesize
 *          type: number
 *          description: Request Page Size ex 10 || 20.
 *        - in: query
 *          name: page
 *          type: number
 *          description: Request Page number offset .
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.get("/listofAudioBooks", audiobookController.listofAudioBooks);

/**
 * @swagger
 * /audiolist/listofPodcast:
 *    get:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Fetch All AudioBooks
 *      summary: Fetch All Podcast by passing pagesize And current page for Pagination
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: pagesize
 *          type: number
 *          description: Request Page Size ex 10 || 20.
 *        - in: query
 *          name: page
 *          type: number
 *          description: Request Page number offset .
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.get("/listofPodcast", audiobookController.listofpodcast);

/**
 * @swagger
 * /audiolist/verifiyAudioBook/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Verifiy AudioBook
 *      summary: Verifiy AudioBook
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              verify :
 *                type : boolean
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/verifiyAudioBook/:audioId", audiobookController.verifiyAudioBook);

/**
 * @swagger
 * /audiolist/BlockunBlockAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Block unBlock Audio
 *      summary: Block unBlock Audio
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              block :
 *                type : boolean
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put(
  "/BlockunBlockAudio/:audioId",
  audiobookController.BlockunBlockAudio
);
/**
 * @swagger
 * /audiolist/deleteAudio/{audioId}:
 *    delete:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Delete Audio
 *      summary: Delete Audio
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.delete("/deleteAudio/:audioId", audiobookController.deleteAudio);

/**
 * @swagger
 * /audiolist/deleteEpisode/{audioId}:
 *    delete:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Delete Audio Episode
 *      summary: Delete Audio Episode
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.delete("/deleteEpisode/:audioId", audiobookController.deleteEpisode);

/**
 * @swagger
 * /audiolist/editAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Edit Audio
 *      summary: Edit Audio
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              audioTag:
 *                type : string
 *              audioTitle:
 *                type : string
 *              audioDescription:
 *                type : string
 *              audioImage:
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/editAudio/:audioId", audiobookController.editAudio);

/**
 * @swagger
 * /audiolist/editEpisode/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Edit episode
 *      summary: Edit episode
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              episodeId:
 *                type : string
 *              title:
 *                type : string
 *              description:
 *                type : string
 *              streamUrl:
 *                type : string
 *              episodeImage :
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/editEpisode/:audioId", audiobookController.editEpisode);
/**
 * @swagger
 * /audiolist/likeAudio/{audioId}:
 *    put:
 *      tags:
 *        - Podcast And AudioBook
 *      descriptions: Like Audio
 *      summary: Like Audio
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: audioId
 *          type: string
 *          required: true
 *          description: uuid ID of the Audio.
 *        - in: body
 *          name: body
 *          description: params.
 *          schema:
 *            type: object
 *            properties:
 *              userID:
 *                type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

router.put("/likeAudio/:audioId", audiobookController.adduserlikes);
module.exports = router;
