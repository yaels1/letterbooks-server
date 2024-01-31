const router = require("express").Router();
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../db/knexfile"));
const jwt = require("jsonwebtoken");

const controllerUser = require("../controllers/controller-user");

router.route("/register").post(controllerUser.register);

router.route("/login").post(controllerUser.login);

router.route("/profile").get(controllerUser.profile);

module.exports = router;
