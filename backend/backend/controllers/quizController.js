const quizData = require('../data/quiz.json');

exports.getQuiz = (req, res) => {
  const object = req.params.object.toLowerCase();
  const quiz = quizData[object];
  if (!quiz) {
    res.json({ questions: [] });
  } else {
    res.json(quiz);
  }
};