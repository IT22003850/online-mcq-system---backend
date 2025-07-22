const Result = require("../models/resultModel");
const Answer = require("../models/answerModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

// @desc    Get past results for a user
// @route   GET /api/results/:userId
// @access  Private (protected by JWT)
const getResults = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Validate userId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400);
    throw new Error("Invalid user ID");
  }

  // Ensure user can only access their own results
  if (userId !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to access other user’s results");
  }

  // Fetch results with populated exam details
  const results = await Result.find({ user_id: userId })
    .populate("exam_id", "title")
    .sort({ timestamp: -1 }); // Sort by most recent

  // Fetch answers for each result
  const detailedResults = await Promise.all(
    results.map(async (result) => {
      const answers = await Answer.find({ result_id: result._id }).populate(
        "question_id",
        "question_text options correct_option"
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

module.exports = { getResults };
