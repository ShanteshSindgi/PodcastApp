const express = require("express");
const router = express.Router();
const notificationController = require("./../controllers/notificationController");

/**
 * @swagger
 * /notifications/add:
 *    post:
 *      tags:
 *        - notifications
 *      descriptions: Add new Notification
 *      summary: Add new Notification by passing Name And description
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: body
 *          description: Create new Notificaition.
 *          schema:
 *            type: object
 *            properties:
 *              notificationName:
 *                type: string
 *              notificationDescription:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Add Notification
router.post("/add", notificationController.addNotification);

/**
 * @swagger
 * /notifications/fetch:
 *    get:
 *      tags:
 *        - notifications
 *      descriptions: Fetch All Notifications
 *      summary: Fetch All Notification by passing pagesize And current page for Pagination
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

//Fetch Notification
router.get("/fetch", notificationController.fetchNotifications);

/**
 * @swagger
 * /notifications/updateNotification/{notificationid}:
 *    put:
 *      tags:
 *        - notifications
 *      descriptions: update notification by passing notification id
 *      summary: update notification by passing notification id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: notificationid
 *          type: string
 *          required: true
 *          description: uuid ID of the notification to update.
 *        - in: body
 *          name: body
 *          description: Notificaiton Params.
 *          schema:
 *            type: object
 *            properties:
 *              notificationName:
 *                type: string
 *              notificationDescription:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

//Update Notification
router.put(
  "/updateNotification/:notificationid",
  notificationController.updateNotification
);

/**
 * @swagger
 * /notifications/deleteNotification/{notificationid}:
 *    delete:
 *      tags:
 *        - notifications
 *      descriptions: Delete notification by passing notification id
 *      summary: Delete notification by passing notification id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: notificationid
 *          type: string
 *          required: true
 *          description: uuid ID of the notification to Delete.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : failed
 *        404:
 *          description : not found
 */

//Delete Notification
router.delete(
  "/deleteNotification/:notificationid",
  notificationController.deleteNotification
);

module.exports = router;
