//  /    get
// /:id     get

const express = require("express");
const router = express.Router();
const controllerBook = require("../controllers/controller-book");

router.route("/").get(controllerBook.bookData);

router.route("/:id").get(controllerBook.singleBook);

module.exports = router;
