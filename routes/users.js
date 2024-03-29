const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const passport = require("passport");
const checkAuth=require('./../middleware/checkAuth');
const { getAccessToken } = require("../middleware/passport-setup");
require("./../middleware/passport-setup");

router.post("/login", userController.loginUser);
router.post("/signup", userController.signUpUser);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/users/good",
    failureRedirect: "/user/failed",
  })
);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    console.log("YO");
    next();
  } else {
    res.sendStatus(401);
  }
};
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get("/good", isLoggedIn, (req, res) => {
  // console.log("name:"+req.user.displayName,"email:"+req.user.emails[0].value);
  // res.send("<h1>Authorized</h1>");
  // res.json({"authorized":"authorized"})
  //
  // res.json('hi');

  res.redirect("http://localhost:4200" + "/?token=" + getAccessToken());
  // res.json()redirect("http://localhost:4200");
  // res.end();
});
router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  cd;
  res.redirect("/");
});

router.post("/forgetpassword", userController.forgetPassword);

router.get("/passwordreset", userController.passwordReset);

router.get(
  "/passwordresetSuccessfull",
  userController.passwordresetSuccessfull
);

/**
 * @swagger
 * /users/userDetails:
 *    get:
 *      tags:
 *        - user
 *      descriptions: Get All Users
 *      responses:
 *        200:
 *          description : Success
 */
router.get("/userDetails",userController.fetchUsers);

/**
 * @swagger
 * /users/updateUser/{userId}:
 *    put:
 *      tags:
 *        - user
 *      descriptions: update user by passing user id
 *      summary: update user by passing user id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *          required: true
 *          description: uuid ID of the user to update.
 *        - in: body
 *          name: body
 *          description: The user to create.
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *      responses:
 *        200:
 *          description : Success
 */
//User Update
router.put("/updateUser/:userid", userController.updateUser);

/**
 * @swagger
 * /users/deleteUser/{userId}:
 *    get:
 *      tags:
 *        - user
 *      descriptions: delete user by passing user id
 *      summary: delete user by passing user id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *          required: true
 *          description: uuid ID of the user to Delete.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description : User deletion failed
 *        404:
 *          description : User not found
 */
router.get("/deleteUser/:userid", userController.deleteUser);

/**
 * @swagger
 * /users/userStatus/{userId}:
 *    get:
 *      tags:
 *        - user
 *      descriptions: get user status by passing user id
 *      summary: get user status by passing user id
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *          required: true
 *          description: uuid ID of the user.
 *        - in: query
 *          name : status
 *          type : boolean
 *          required: true
 *          description: current status.
 *      responses:
 *        200:
 *          description : Success
 *        204:
 *          description :  failed
 *        404:
 *          description : not found
 */
router.get("/userStatus/:userid", userController.userStatus);

module.exports = router;
