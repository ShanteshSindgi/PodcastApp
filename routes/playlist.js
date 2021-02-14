const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

/**
 * @swagger
 * /playlist/getuserplaylist:y
 *    get:
 *      tags:
 *        - playlist
 *      descriptions: Fetch user playlist
 *      summary: Fetch user playlist by passing userId and pagesize,current page for Pagination
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: query
 *          name: userId
 *          type: string
 *          description: user uuid
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
 *          description :  failed
 *        404:
 *          description : not found
 */

router.get("/getuserplaylist", playlistController.getuserplaylist);

/**
 * @swagger
 * /playlist/createplaylist:
 *    post:
 *      tags:
 *        - playlist
 *      descriptions: Add new playlist
 *      summary: Add new playlist by passing Name and userId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Create new playlist.
 *          schema:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *                required: true
 *              playlistName:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.post("/createplaylist", playlistController.createPlaylist);

/**
 * @swagger
 * /playlist/addmediatoplaylist:
 *    post:
 *      tags:
 *        - playlist
 *      descriptions: Add new media in playlist
 *      summary: Add new new media in playlist by passing playlistId,audioId,episodeId and userId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: add new media.
 *          schema:
 *            type: object
 *            properties:
 *              playlistId:
 *                type: string
 *                required: true
 *              audioId:
 *                type: string
 *                required: true
 *              episodeId:
 *                type: string
 *                required: true
 *              userId:
 *                type: string
 *                required: true
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.post("/addmediatoplaylist", playlistController.addmediatoplaylist);

/**
 * @swagger
 * /playlist/removesongfromplaylist/{userId}:
 *    delete:
 *      tags:
 *        - playlist
 *      descriptions: delete Media from playlist by passing playlistId,userId and itemId
 *      summary: delete Media from playlist by passing playlistId,userId and itemId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *          required: true
 *          description: uuid ID of the feature to update.
 *        - in: body
 *          name: body
 *          description: feature Params.
 *          schema:
 *            type: object
 *            properties:
 *              playlistId:
 *                type: string
 *              itemId:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.delete(
  "/removesongfromplaylist/:userId",
  playlistController.removesongfromplaylist
);
module.exports = router;
