const Exam = require("../models/examModel");
const User = require("../models/userModel");
const mongoose = require('mongoose')
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


// @desc    Submit answers for an exam and calculate result
// @route   POST /api/exams/:examId/submit
// @access  Private (protected by JWT)
const submitExam = asyncHandler(async (req, res) => {
  // Extract examId from URL parameters and answers from request body
  const { examId } = req.params;
  const { answers } = req.body;

  // Validate examId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(examId)) {
    res.status(400);
    throw new Error('Invalid exam ID');
  }

  // Check if exam exists
  const exam = await Exam.findById(examId);
  if (!exam) {
    res.status(404);
    throw new Error('Exam not found');
  }

  // Validate answers array
  if (!answers || !Array.isArray(answers) || answers.length !== 5) {
    res.status(400);
    throw new Error('Exactly 5 answers are required');
  }

  // Fetch questions for the exam
  const questions = await Question.find({ exam_id: examId });
  if (questions.length !== 5) {
    res.status(404);
    throw new Error('Expected 5 questions for this exam');
  }

  // Validate all question IDs in answers
  const questionIds = questions.map((q) => q._id.toString());
  const answerQuestionIds = answers.map((a) => a.question_id);
  const invalidQuestionIds = answerQuestionIds.filter(
    (id) => !mongoose.Types.ObjectId.isValid(id) || !questionIds.includes(id)
  );
  if (invalidQuestionIds.length > 0) {
    res.status(400);
    throw new Error('Invalid question IDs provided');
  }

  // Calculate score and prepare answer documents
  let score = 0;
  const answerDocs = [];
  for (const answer of answers) {
    const question = questions.find(
      (q) => q._id.toString() === answer.question_id
    );
    const isCorrect = answer.selected_option === question.correct_option;
    if (isCorrect) score += 1;

    answerDocs.push({
      question_id: answer.question_id,
      selected_option: answer.selected_option,
      is_correct: isCorrect,
    });
  }

  // Create result document
  const result = await Result.create({
    user_id: req.user._id,
    exam_id: examId,
    score,
    timestamp: new Date(),
  });

  // Add result_id to answer documents and save
  const answersWithResultId = answerDocs.map((answer) => ({
    ...answer,
    result_id: result._id,
  }));
  await Answer.insertMany(answersWithResultId);

  // Prepare response with question details
  const responseAnswers = answers.map((answer) => {
    const question = questions.find(
      (q) => q._id.toString() === answer.question_id
    );
    return {
      question_id: answer.question_id,
      question_text: question.question_text,
      selected_option: answer.selected_option,
      correct_option: question.correct_option,
      is_correct: answer.selected_option === question.correct_option,
    };
  });

  // Return result
  res.status(200).json({
    score,
    answers: responseAnswers,
  });
});

// @desc    Get past results for a user
// @route   GET /api/results/:userId
// @access  Private (protected by JWT)
const getResults = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Validate userId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error('Invalid user ID');
  }

  // Ensure user can only access their own results
  if (userId !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to access other user’s results');
  }

  // Fetch results with populated exam details
  const results = await Result.find({ user_id: userId })
    .populate('exam_id', 'title')
    .sort({ timestamp: -1 }); // Sort by most recent

  // Fetch answers for each result
  const detailedResults = await Promise.all(
    results.map(async (result) => {
      const answers = await Answer.find({ result_id: result._id }).populate(
        'question_id',
        'question_text options correct_option'
      );
      return {
        result_id: result._id,
        exam_id: result.exam_id._id,
        exam_title: result.exam_id.title,
        score: result.score,
        timestamp: result.timestamp,
        answers: answers.map((answer) => ({
          question_id: answer.question_id._id,
          question_text: answer.question_id.question_text,
          selected_option: answer.selected_option,
          correct_option: answer.question_id.correct_option,
          is_correct: answer.is_correct,
        })),
      };
    })
  );

  // Return results
  res.status(200).json(detailedResults);
});


module.exports = {getExams, getQuestions, submitExam, getResults}