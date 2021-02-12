const express = require("express");
const router = express.Router();
const paymentDetailsController = require("./../controllers/paymentDetailsController");

/**
 * @swagger
 * /payments/fetch:
 *    get:
 *      tags:
 *        - payment
 *      descriptions: Fetch All categorie
 *      summary: Fetch All payment history by passing pagesize And current page for Pagination
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
router.get("/fetch", paymentDetailsController.fetchPaymentDetails);

module.exports = router;
