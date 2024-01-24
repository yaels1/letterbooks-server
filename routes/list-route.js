//    /    get
//    /read    get  post
//    /recommendations     get

const express = require("express");
const router = express.Router();
const controllerList = require("../controllers/controller-list");

// router.route("/list").get(controllerList.listData);

// router.route("/list/read").get().post();

// router.route("/list/recommendations").get();

module.exports = router;
