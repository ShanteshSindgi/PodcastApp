const express = require("express");
const router = express.Router();
const subscriptionController = require("./../controllers/subscriptionController");
const checkauth = require("./../middleware/checkAuth");

/**
 * @swagger
 * /subscriptions/add:
 *    post:
 *      tags:
 *        - subscription
 *      descriptions: Add new Subscription by passing Name,price and Features
 *      summary: Add new Subscription by passing Name,price and Features
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Create new Tag.
 *          schema:
 *            type: object
 *            properties:
 *              subscriptionName:
 *                type: string
 *              subscriptionPrice:
 *                type: number
 *              subscriptionDuration:
 *                type: number
 *                default : 1
 *              subscriptionFeatures:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Add Subscription
router.post("/add", subscriptionController.addSubscription);

/**
 * @swagger
 * /subscriptions/fetch:
 *    get:
 *      tags:
 *        - subscription
 *      descriptions: Fetch All subscriptions
 *      summary: Fetch All subscriptions by passing pagesize And current page for Pagination
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

//Fetch Subscription
router.get("/fetch", subscriptionController.fetchSubscriptions);

/**
 * @swagger
 * /subscriptions/updateSubscription/{subscriptionid}:
 *    put:
 *      tags:
 *        - subscription
 *      descriptions: update subscriptions by passing subscriptions id
 *      summary: update subscriptions by passing subscriptions id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: subscriptionid
 *          type: string
 *          required: true
 *          description: uuid ID of the subscriptions to update.
 *        - in: body
 *          name: body
 *          description: subscription Params.
 *          schema:
 *            type: object
 *            properties:
 *              subscriptionName:
 *                type: string
 *              subscriptionPrice:
 *                type: number
 *              subscriptionDuration:
 *                type: number
 *                default : 1
 *              subscriptionFeatures:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Update Subscription
router.put(
  "/updateSubscription/:subscriptionid",
  subscriptionController.updateSubscription
);

/**
 * @swagger
 * /subscriptions/deleteSubscription/{subscriptionid}:
 *    delete:
 *      tags:
 *        - subscription
 *      descriptions: delete Subscription by passing Subscription id
 *      summary: delete Subscription by passing Subscription id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: subscriptionid
 *          type: string
 *          required: true
 *          description: uuid ID of the Subscription to delete.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Delete Subscription
router.delete(
  "/deleteSubscription/:subscriptionid",
  subscriptionController.deleteSubscription
);

//BuySubscription
router.post(
  "/buy",
  checkauth.authorization,
  subscriptionController.buySubscription
);

module.exports = router;
