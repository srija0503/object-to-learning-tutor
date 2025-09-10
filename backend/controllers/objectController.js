const recognizeObject = require('../ml/recognizeObject');
const objectsData = require('../data/objects.json');

exports.recognizeObject = async (req, res) => {
  const { image } = req.body;
  const objectName = await recognizeObject(image);
  const objectInfo = objectsData[objectName] || {
    name: objectName,
    science: 'Info not found',
    history: 'Info not found',
    math: 'Info not found'
  };
  res.json(objectInfo);
};

const recognizeObject = require('../ml/recognizeObject');
const objectsData = require('../data/objects.json');

exports.recognizeObject = async (req, res) => {
  const { image } = req.body;
  const objectName = await recognizeObject(image);
  const objectInfo = objectsData[objectName] || {
    name: objectName,
    science: 'Info not found',
    history: 'Info not found',
    math: 'Info not found'
  };
  res.json(objectInfo);
};