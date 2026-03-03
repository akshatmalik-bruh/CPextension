const express = require("express");
const router = express.Router();
const {AnalysisController} = require("../controller/analysisController");
router.post("/analyse",AnalysisController);

module.exports = router;