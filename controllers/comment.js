const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Comment = require("../models/Comment");

exports.getCommentsPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId }).lean();

  let parentArray = [];

  comments.forEach((comment) => {
    if (comment.parentComment) {
      comments.forEach((comment2) => {
        if (comment2._id.toString() === comment.parentComment.toString()) {
          parentArray.push({ ...comment2, comments: [comment2.comments, comment] });
        }
      });
    } else {
      parentArray.push(comment);
    }
  });

  console.log(comments);

  return res.status(200).json({ success: true, data: parentArray, count: parentArray.length });
});

exports.addComment = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  req.body.user = req.user.id;
  req.body.post = postId;

  const comment = await Comment.create(req.body);

  return res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.updateComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;

  let comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new ErrorResponse(`No comment with the id of ${req.params.id}`, 404));
  }

  if (comment.user.toString() !== req.user.id.toString()) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update community ${community._id}`, 401));
  }

  comment = await Comment.findByIdAndUpdate(commentId, req.body, {
    new: true,
    runValidators: true,
  });

  comment.save();

  return res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.deleteComment = asyncHandler(async (req, res, next) => {
  const { commentId } = req.params;

  let comment = await Comment.findById(commentId);

  if (!comment) {
    return next(new ErrorResponse(`No comment with the id of ${req.params.id}`, 404));
  }

  if (comment.user.toString() !== req.user.id.toString()) {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update community ${community._id}`, 401));
  }

  await comment.deleteOne({ _id: commentId });

  res.status(200).json({
    success: true,
    data: {},
  });
});

exports.replyComment = asyncHandler(async (req, res, next) => {
  const { postId, commentId } = req.params;

  req.body.user = req.user.id;
  req.body.post = postId;

  if (commentId) {
    req.body.parentComment = commentId;
  }

  const comment = await Comment.create(req.body);

  return res.status(200).json({
    success: true,
    data: comment,
  });
});
