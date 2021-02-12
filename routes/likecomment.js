const express = require("express");
const router = express.Router();
const likecommentController = require("./../controllers/likecommentController");

/**
 * @swagger
 * /likecomment/userLikes/{userID}:
 *    get:
 *      tags:
 *        - likecomment
 *      descriptions: Fetch All categorie
 *      summary: Fetch All users like history by passing userId and  pagesize, current page for Pagination
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userID
 *          type: string
 *          required: true
 *          description: uuid ID of the user.
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
router.get("/userLikes/:userID", likecommentController.getUserlikesAndComments);

/**
 * @swagger
 * /likecomment/userComment/{userID}:
 *    get:
 *      tags:
 *        - likecomment
 *      descriptions: Fetch All categorie
 *      summary: Fetch All users comments history by passing userId and  pagesize, current page for Pagination
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userID
 *          type: string
 *          required: true
 *          description: uuid ID of the user.
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
router.get("/userComment/:userID", likecommentController.getUserComments);

module.exports = router;
