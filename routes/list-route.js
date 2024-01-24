//    /    get
//    /read    get  post
//    /recommendations     get

const express = require("express");
const router = express.Router();
const controller_list = require("../controllers/controller_list");

router.route("/list").get();

router.route("/list/read").get().post();

router.route("/list/recommendations").get();

module.exports = router;
