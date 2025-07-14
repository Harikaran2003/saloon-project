const express = require("express");
const partnerRoutes = require("./partnerRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/partner", partnerRoutes);
router.use("/user", userRoutes);

module.exports = router;
