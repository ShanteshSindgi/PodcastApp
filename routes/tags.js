const express = require("express");
const router = express.Router();
const tagController = require("./../controllers/tagController");

/**
 * @swagger
 * /tags/add:
 *    post:
 *      tags:
 *        - tag
 *      descriptions: Add new Tag
 *      summary: Add new Tag by passing Name And description
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Create new Tag.
 *          schema:
 *            type: object
 *            properties:
 *              tagName:
 *                type: string
 *              tagDescription:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Add Tag
router.post("/add", tagController.addTag);

/**
 * @swagger
 * /tags/fetch:
 *    get:
 *      tags:
 *        - tag
 *      descriptions: Fetch All tag
 *      summary: Fetch All tag by passing pagesize And current page for Pagination
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
 *          description :  failed
 *        404:
 *          description : not found
 */

//Fetch Tag
router.get("/fetch", tagController.fetchtags);

/**
 * @swagger
 * /tags/updateTag/{tagid}:
 *    put:
 *      tags:
 *        - tag
 *      descriptions: update tag by passing tag id
 *      summary: update tag by passing tag id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: tagid
 *          type: string
 *          required: true
 *          description: uuid ID of the tag to update.
 *        - in: body
 *          name: body
 *          description: tag Params.
 *          schema:
 *            type: object
 *            properties:
 *              tagName:
 *                type: string
 *              tagDescription:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Update Tag
router.put("/updateTag/:tagid", tagController.updateTag);

/**
 * @swagger
 * /tags/deleteTag/{tagid}:
 *    delete:
 *      tags:
 *        - tag
 *      descriptions: delete tag by passing tag id
 *      summary: delete tag by passing tag id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: tagid
 *          type: string
 *          required: true
 *          description: uuid ID of the tag to delete.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Delete Tag
router.delete("/deleteTag/:tagid", tagController.deletetTag);

module.exports = router;
