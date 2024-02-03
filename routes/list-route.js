const express = require("express");
const router = express.Router();
const controllerList = require("../controllers/controller-list");

router
  .route("/read")

  .post(controllerList.addUserReadBook);

router.route("/:userId/read").get(controllerList.readBookData);

module.exports = router;
