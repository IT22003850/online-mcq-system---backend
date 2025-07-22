const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  exam_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  question_text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length === 4; // Ensure exactly 4 options
      },
      message: 'Questions must have exactly 4 options'
    }
  },
  correct_option: {
    type: Number,
    required: true,
    min: 0,
    max: 3 // Index of correct option (0 to 3 for 4 options)
  }
});

module.exports = mongoose.model('Question', questionSchema);