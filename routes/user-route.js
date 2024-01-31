const express = require("express");
const router = express.Router();
const controllerUser = require("../controllers/controller-user");

router.route("/register").post(controllerUser.register);

router.route("/login").post(controllerUser.login);

router.route("/profile").get(controllerUser.profile);

module.exports = router;
