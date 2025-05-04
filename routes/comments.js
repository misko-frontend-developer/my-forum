const express = require("express");
const { getCommentsPost, addComment, updateComment } = require("../controllers/comment");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/:postId").get(protect, getCommentsPost).post(protect, addComment);

router.route("/:commentId/comment").put(protect, updateComment);

// router.route("/:id").put(protect, updateCommunity).delete(protect, deleteCommunity);

module.exports = router;
