// const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Community = require("../models/Community");

exports.getCommunities = asyncHandler(async (req, res, next) => {
  const result = await Community.find({});

  res.status(200).json({ success: true, data: result });
});

exports.addCommunity = asyncHandler(async (req, res, next) => {
  // const { name, description } = req.body;
  console.log(req.body);
  // const community = await Community.create({ name, description });

  return res.status(200).json({
    success: true,
    data: {},
  });
});
