const express = require("express");
const { getCommunities, addCommunity } = require("../controllers/community");

// const User = require("../models/User");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCommunities).post(addCommunity);

// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
