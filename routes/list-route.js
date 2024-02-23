const express = require("express");
const router = express.Router();
const controllerList = require("../controllers/controller-list");

router.route("/read").post(controllerList.addUserReadBook);
router.route("/:userId/read").get(controllerList.readBookData);

router.route("/wishlist").post(controllerList.addUserWishlistBook);
router.route("/:userId/wishlist").get(controllerList.wishlistBookData);

router.route("/recs").post(controllerList.addUserRecsBook);
router.route("/:userId/recs").get(controllerList.recsBookData);

module.exports = router;
