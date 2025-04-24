const express = require("express");
const { getUsers } = require("../controllers/users");

const User = require("../models/User");

const router = express.Router({ mergeParams: true });

router.route("/").get(getUsers);

// router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
