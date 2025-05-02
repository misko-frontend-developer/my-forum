const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Post = require("../models/Post");
const mongoose = require('mongoose')

exports.getCommunityPosts = asyncHandler(async (req, res, next) => {
const {communityId }= req.params;
    const result = await Post.find({ communityId: new mongoose.Types.ObjectId(communityId) });


    // if (!mongoose.Types.ObjectId.isValid(communityId)) {
    //     return res.status(400).json({ error: "Invalid community ID" });
    //   }

    console.log( communityId  , result);
    return res.status(200).json({
        success: true,
        data: result
      });

 
})

// exports.getCommunities = asyncHandler(async (req, res, next) => {
//   const result = await Community.find({});
//   res.status(200).json({ success: true, data: result });
// });

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
