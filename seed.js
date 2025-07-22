const mongoose = require("mongoose");
const Exam = require("./models/examModel");
const Question = require("./models/questionModel");
const User = require("./models/userModel");
const dotenv = require('dotenv').config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await Exam.deleteMany();
    await Question.deleteMany();
    await User.deleteMany();

    // Seed Exams
    const exams = await Exam.insertMany([
      { title: 'Math Mock Test', description: 'Basic algebra and arithmetic' },
      { title: 'Science Mock Test', description: 'General science concepts' },
      { title: 'English Mock Test', description: 'Grammar and vocabulary' },
    ]);

    // Seed Questions
    await Question.insertMany([
      // Math Mock Test Questions
      {
        exam_id: exams[0]._id,
        question_text: 'What is 2 + 2?',
        options: ['2', '4', '6', '8'],
        correct_option: 1,
      },
      {
        exam_id: exams[0]._id,
        question_text: 'What is the square root of 16?',
        options: ['2', '4', '8', '16'],
        correct_option: 1,
      },
      {
        exam_id: exams[0]._id,
        question_text: 'What is 5 * 3?',
        options: ['10', '15', '20', '25'],
        correct_option: 1,
      },
      {
        exam_id: exams[0]._id,
        question_text: 'What is 10 / 2?',
        options: ['2', '4', '5', '10'],
        correct_option: 2,
      },
      {
        exam_id: exams[0]._id,
        question_text: 'What is 3 + 4?',
        options: ['5', '7', '9', '11'],
        correct_option: 1,
      },
      // Science Mock Test Questions
      {
        exam_id: exams[1]._id,
        question_text: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'N2'],
        correct_option: 0,
      },
      {
        exam_id: exams[1]._id,
        question_text: 'What planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correct_option: 1,
      },
      {
        exam_id: exams[1]._id,
        question_text: 'What is the primary source of energy for Earth?',
        options: ['Moon', 'Sun', 'Wind', 'Tides'],
        correct_option: 1,
      },
      {
        exam_id: exams[1]._id,
        question_text: 'What gas do plants absorb during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
        correct_option: 2,
      },
      {
        exam_id: exams[1]._id,
        question_text: 'What is the boiling point of water at standard pressure?',
        options: ['50°C', '100°C', '150°C', '200°C'],
        correct_option: 1,
      },
      // English Mock Test Questions
      {
        exam_id: exams[2]._id,
        question_text: 'Which word is a synonym for "happy"?',
        options: ['Sad', 'Joyful', 'Angry', 'Tired'],
        correct_option: 1,
      },
      {
        exam_id: exams[2]._id,
        question_text: 'What is the past tense of "go"?',
        options: ['Goes', 'Going', 'Went', 'Gone'],
        correct_option: 2,
      },
      {
        exam_id: exams[2]._id,
        question_text: 'Which sentence is grammatically correct?',
        options: [
          'She go to school.',
          'She goes to school.',
          'She going to school.',
          'She gone to school.',
        ],
        correct_option: 1,
      },
      {
        exam_id: exams[2]._id,
        question_text: 'What is an antonym for "big"?',
        options: ['Large', 'Huge', 'Small', 'Tall'],
        correct_option: 2,
      },
      {
        exam_id: exams[2]._id,
        question_text: 'Which word is a noun?',
        options: ['Run', 'Quickly', 'Dog', 'Fast'],
        correct_option: 2,
      },
    ]);

    // Seed Users
    await User.insertMany([
      { name: 'Test User', email: 'test@example.com' },
    ]);

    console.log('Database seeded successfully'.green);
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`.red);
    process.exit(1);
  }
};

seedData();