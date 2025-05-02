const express = require("express");
const { getCommunityPosts, } = require("../controllers/posts");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/:communityId")
  .get(protect,  getCommunityPosts)
 
module.exports = router;
