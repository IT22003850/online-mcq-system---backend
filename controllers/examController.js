const Exam = require("../models/examModel");
const User = require("../models/userModel");
const Question = require('../models/questionModel');
const asyncHandler = require("express-async-handler");


// @desc    Get fetch all exams
// @route   GET /api/exams/
// @access  Private (protected by JWT)
const getExams = asyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).json(exams);
});


// @desc    Get questions for a specific exam
// @route   GET /api/exams/:examId/questions
// @access  Private (protected by JWT)
const getQuestions = asyncHandler(async (req, res) => {
  const { examId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(examId)) {
    res.status(400);
    throw new Error('Invalid exam ID');
  }

  const exam = await Exam.findById(examId);
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  const questions = await Question.find({ exam_id: examId }).select(
    '-correct_option'
  );

  if (questions.length !== 5) {
    res.status(404);
    throw new Error('Expected 5 questions for this exam');
  }

  res.status(200).json(questions);
});


module.exports = {getExams, getQuestions}