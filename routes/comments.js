const express = require("express");
const { getCommentsPost, addComment, updateComment, deleteComment } = require("../controllers/comment");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/:postId").get(protect, getCommentsPost).post(protect, addComment);

router.route("/:commentId/comment").put(protect, updateComment).delete(protect, deleteComment);

module.exports = router;
