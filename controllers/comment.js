const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const Comment = require("../models/Comment");

exports.getCommentsPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;
  const result = await Comment.find({ postId });
  res.status(200).json({ success: true, data: result });
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
// exports.addCommunity = asyncHandler(async (req, res, next) => {
//   const { name } = req.body;
//   req.body.user = req.user.id;

//   const checkForName = await Community.findOne({ name });

//   if (checkForName) {
//     return next(
//       new ErrorResponse("There is existing community with this name!", 403)
//     );
//   }

//   const community = await Community.create(req.body);

//   return res.status(200).json({
//     success: true,
//     data: community,
//   });
// });

// exports.updateCommunity = asyncHandler(async (req, res, next) => {
//   let community = await Community.findById(req.params.id);

//   if (!community) {
//     return next(
//       new ErrorResponse(`No Community with the id of ${req.params.id}`, 404)
//     );
//   }

//   if (community.user.toString() !== req.user.id) {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update community ${community._id}`,
//         401
//       )
//     );
//   }

//   community = await Community.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   community.save();

//   return res.status(200).json({
//     success: true,
//     data: community,
//   });
// });

// exports.deleteCommunity = asyncHandler(async (req, res, next) => {
//   let community = await Community.findById(req.params.id);

//   if (!community) {
//     return next(
//       new ErrorResponse(`No Community with the id of ${req.params.id}`, 404)
//     );
//   }

//   if (community.user.toString() !== req.user.id) {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to update community ${community._id}`,
//         401
//       )
//     );
//   }

//   await community.deleteOne({ _id: community.user.id });

//   res.status(200).json({
//     success: true,
//     data: {},
//   });
// });
