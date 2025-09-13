// backend/routes/objectRoutes.js
const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');

// Only call controller here, no duplicate recognizeObject import
router.post('/recognize', objectController.recognize);

module.exports = router;
