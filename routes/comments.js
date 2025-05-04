const express = require("express");
const { getCommentsPost, addComment, updateComment, deleteComment, replyComment } = require("../controllers/comment");

const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.route("/:postId").get(protect, getCommentsPost).post(protect, addComment);

router.route("/:commentId/comment").put(protect, updateComment).delete(protect, deleteComment);

router.route("/:postId/:commentId").post(protect, replyComment);

module.exports = router;
