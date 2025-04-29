// const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

//GET Users
exports.getUsers = asyncHandler(async (req, res, next) => {
  const result = await User.find({});
  res.status(200).json({ success: true, data: result });
});
