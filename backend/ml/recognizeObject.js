// backend/controllers/objectController.js
const recognizeObject = require('../ml/recognizeObject');  // ✅ only once

/**
 * Controller function to handle object recognition
 */
exports.recognize = async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required' });
    }

    const result = await recognizeObject(imageBase64);

    res.json({ object: result });
  } catch (error) {
    console.error('Error recognizing object:', error);
    res.status(500).json({ error: 'Failed to recognize object' });
  }
};
