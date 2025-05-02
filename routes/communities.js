const express = require("express");
const { getCommunities, addCommunity  , updateCommunity , deleteCommunity} = require("../controllers/community");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect,  getCommunities)
  .post(protect, addCommunity);

router.route("/:id").put(protect ,updateCommunity ).delete(protect , deleteCommunity);

module.exports = router;
