const express = require("express");
const router = express.Router();
const controllerList = require("../controllers/controller-list");

router
  .route("/read")

  .post(controllerList.addUserReadBook);

router.route("/:userId/read").get(controllerList.readBookData);

module.exports = router;

// read books
// join table for userid and bookid post request for when they
// click on the "add book to my list" button
