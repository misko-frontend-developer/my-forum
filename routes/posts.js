const express = require("express");
const { getCommunityPosts, createPost } = require("../controllers/posts");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/:communityId").get(protect, getCommunityPosts).post(protect, createPost);

module.exports = router;
