const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');

router.post('/recognize', objectController.recognizeObject);

module.exports = router;