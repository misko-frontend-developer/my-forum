const express = require("express");
const { getUsers } = require("../controllers/users");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');
router.route("/").get(protect ,authorize("admin"), getUsers);

module.exports = router;
