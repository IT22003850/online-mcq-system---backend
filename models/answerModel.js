const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  result_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Result',
    required: true
  },
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  selected_option: {
    type: Number,
    required: true,
    min: 0,
    max: 3 // Index of selected option (0 to 3 for 4 options)
  },
  is_correct: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Answer', answerSchema);