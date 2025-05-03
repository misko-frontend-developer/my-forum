const mongoose = require("mongoose");

const CommunitySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "There is a community with this name choose a different one"],
    required: [true, "Please add a community name"],
  },
  description: {
    type: String,
    required: [true, "Please add an description"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Community", CommunitySchema);
