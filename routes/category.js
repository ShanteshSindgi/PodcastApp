const express = require("express");
const router = express.Router();
const categoryController = require("./../controllers/categoryController");

/**
 * @swagger
 * /categories/add:
 *    post:
 *      tags:
 *        - categorie
 *      descriptions: Add new Categorie
 *      summary: Add new Categorie by passing Name And Tag Array
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Create new Categorie.
 *          schema:
 *            type: object
 *            properties:
 *              categoryName:
 *                type: string
 *              categoryTags:
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

//Add Category
router.post("/add", categoryController.addCategory);

/**
 * @swagger
 * /categories/fetch:
 *    get:
 *      tags:
 *        - categorie
 *      descriptions: Fetch All categorie
 *      summary: Fetch All Categorie by passing pagesize And current page for Pagination
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

//Fetch Category
router.get("/fetch", categoryController.fetchCategorys);

/**
 * @swagger
 * /categories/updateCategory/{categoryid}:
 *    put:
 *      tags:
 *        - categorie
 *      descriptions: update Categorie by passing Categorie id
 *      summary: update Categorie by passing Categorie id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: categoryid
 *          type: string
 *          required: true
 *          description: uuid ID of the Categorie to update.
 *        - in: body
 *          name: body
 *          description: Notificaiton Params.
 *          schema:
 *            type: object
 *            properties:
 *              categoryName:
 *                type: string
 *              categoryTags:
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

//Update Category
router.put("/updateCategory/:categoryid", categoryController.updateCategory);

/**
 * @swagger
 * /categories/deleteCategory/{categoryid}:
 *    delete:
 *      tags:
 *        - categorie
 *      descriptions: Delete Categorie by passing Categorie id
 *      summary: Delete Categorie by passing Categorie id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: categoryid
 *          type: string
 *          required: true
 *          description: uuid ID of Categorie to Delete.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

//Delete Category
router.delete("/deleteCategory/:categoryid", categoryController.deleteCategory);

module.exports = router;
