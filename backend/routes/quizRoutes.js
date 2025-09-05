const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.get('/:object', quizController.getQuiz);

module.exports = router;