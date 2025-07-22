const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {getExams, getQuestions} = require('../controllers/examController')

router.get("/", protect, getExams);
router.get("/:examId/questions", protect, getQuestions);

module.exports = router;