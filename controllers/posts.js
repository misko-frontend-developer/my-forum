const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const Community = require("../models/Community");

exports.getCommunityPosts = asyncHandler(async (req, res, next) => {
  const { communityId } = req.params;
  const community = await Community.findById(communityId);

  if (!community) {
    return next(new ErrorResponse("There is no such community!", 403));
  }

  const posts = await Post.find({ communityId });

  return res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorResponse("There is no such post!", 403));
  }

  return res.status(200).json({
    success: true,
    data: post,
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const { communityId } = req.params;
  req.body.communityId = communityId;
  req.body.user = req.user.id;

  const community = await Community.findById(communityId);

  if (!community) {
    return next(new ErrorResponse("There is no such community!", 403));
  }

  const post = await Post.create(req.body);

  return res.status(200).json({
    success: true,
    data: post,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  let post = await Post.findOne({ _id: postId });

  if (!post) {
    return next(new ErrorResponse("There is no such a post!", 403));
  }

  if (String(req.user.id) !== String(post.user)) {
    return next(new ErrorResponse("You cant edit this post!", 403));
  }

  post = await Post.findByIdAndUpdate(postId, req.body, {
    new: true,
    runValidators: true,
  });

  post.save();

  return res.status(200).json({
    success: true,
    data: post,
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const { postId } = req.params;

  let post = await Post.findOne({ _id: postId });

  if (!post) {
    return next(new ErrorResponse("There is no such a post!", 403));
  }

  if (String(req.user.id) !== String(post.user)) {
    return next(new ErrorResponse("You cant edit this post!", 403));
  }

  await post.deleteOne({ _id: postId });

  res.status(200).json({
    success: true,
    data: {},
  });
});
