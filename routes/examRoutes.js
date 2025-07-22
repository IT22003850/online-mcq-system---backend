const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {getExams, getQuestions, submitExam} = require('../controllers/examController')

router.get("/", protect, getExams);
router.get("/:examId/questions", protect, getQuestions);
router.post("/:examId/submit", protect, submitExam)


module.exports = router;