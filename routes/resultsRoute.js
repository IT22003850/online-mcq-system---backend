const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {getResults} = require("../controllers/resultsController")

router.get('/:userId', protect, getResults);

module.exports = router;