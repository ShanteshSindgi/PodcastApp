const express = require("express");
const router = express.Router();
const dashboardController = require("./../controllers/dashboardController");

/**
 * @swagger
 * /dashboard/getDashboard:
 *    get:
 *      tags:
 *        - dashboard
 *      descriptions: Fetch All dashboard data
 *      summary: Fetch All dashboard data
 *      consumes:
 *        - application/json
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */

router.get("/getDashboard", dashboardController.getDashboard);
module.exports = router;
