const express = require("express");
const { getCommunities, addCommunity } = require("../controllers/community");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(protect,  getCommunities)
  .post(protect, addCommunity);

module.exports = router;
