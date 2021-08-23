const express = require('express');
const router = express.Router();

const hatRoutes = require("./hat");
const seferRoutes = require("./sefer");

//router.use("/hatlar/:hatId/seferler", seferRoutes);
router.use("/", seferRoutes);
router.use("/hatlar", hatRoutes);

module.exports = router;