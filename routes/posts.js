const express = require("express");
const { getCommunityPosts, createPost, updatePost, deletePost, getPost } = require("../controllers/posts");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/:communityId/community").get(protect, getCommunityPosts).post(protect, createPost);

router.route("/:postId").get(getPost).put(protect, updatePost).delete(protect, deletePost);

module.exports = router;
