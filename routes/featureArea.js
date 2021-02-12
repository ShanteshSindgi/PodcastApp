const express = require("express");
const router = express.Router();
const featureareaController = require("./../controllers/featureareaController");

/**
 * @swagger
 * /featureArea/addNewFeatureArea:
 *    post:
 *      tags:
 *        - featureArea
 *      descriptions: Add new Feature Area
 *      summary: Add new Feature Area by passing Name And position and Audios
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Create new featureArea.
 *          schema:
 *            type: object
 *            properties:
 *              featureName:
 *                type: string
 *                required: true
 *              featurePosition:
 *                type: number
 *                default : 1
 *              featureAudios :
 *                type : array
 *                items :
 *                  type : string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.post("/addNewFeatureArea", featureareaController.AddnewFeatureArea);

/**
 * @swagger
 * /featureArea/fetchAllFeatureArea:
 *    get:
 *      tags:
 *        - featureArea
 *      descriptions: Fetch All featureArea
 *      summary: Fetch All featureArea by passing pagesize And current page for Pagination
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

router.get("/fetchAllFeatureArea", featureareaController.fetchAllFeatureArea);

/**
 * @swagger
 * /featureArea/fetchAllFeatureAreaWithoutMedia:
 *    get:
 *      tags:
 *        - featureArea
 *      descriptions: Fetch All featureArea without Media
 *      summary: Fetch All featureArea without Media by passing pagesize And current page for Pagination
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

router.get(
  "/fetchAllFeatureAreaWithoutMedia",
  featureareaController.fetchAllFeatureAreaWithoutMedia
);

/**
 * @swagger
 * /featureArea/addNewMedia/{featureId}:
 *    put:
 *      tags:
 *        - featureArea
 *      descriptions: Add new Media in feature Area by passing featureId and media Array
 *      summary: Add new Media in feature Area by passing featureId and media Array
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: featureId
 *          type: string
 *          required: true
 *          description: uuid ID of the feature to update.
 *        - in: body
 *          name: body
 *          description: featureId Params.
 *          schema:
 *            type: object
 *            properties:
 *              media:
 *                type: array
 *                items:
 *                  type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.put("/addNewMedia/:featureId", featureareaController.addNewMedia);

/**
 * @swagger
 * /featureArea/removeMedia/{featureId}:
 *    delete:
 *      tags:
 *        - featureArea
 *      descriptions: delete Media in feature Area by passing featureId and mediaId
 *      summary: delete Media in feature Area by passing featureId and mediaId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: featureId
 *          type: string
 *          required: true
 *          description: uuid ID of the feature to update.
 *        - in: body
 *          name: body
 *          description: feature Params.
 *          schema:
 *            type: object
 *            properties:
 *              mediaId:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.delete("/removeMedia/:featureId", featureareaController.removeMedia);
/**
 * @swagger
 * /featureArea/deleteFeatureArea/{featureId}:
 *    delete:
 *      tags:
 *        - featureArea
 *      descriptions: delete feature Area by passing featureId
 *      summary: delete feature Area by passing featureId
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: featureId
 *          type: string
 *          required: true
 *          description: uuid ID of the feature to update.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.delete(
  "/deleteFeatureArea/:featureId",
  featureareaController.deleteFeatureArea
);
module.exports = router;
