const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Community = require("../models/Community");

exports.getCommunities = asyncHandler(async (req, res, next) => {
  const result = await Community.find({});
  res.status(200).json({ success: true, data: result });
});

exports.addCommunity = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  req.body.user = req.user.id;
 

  const checkForName = await Community.findOne({name})

  if(checkForName){
    return next(new ErrorResponse("There is existing community with this name!", 403));

  }

  const community = await Community.create(req.body);

  return res.status(200).json({
    success: true,
    data:community,
  });
});
