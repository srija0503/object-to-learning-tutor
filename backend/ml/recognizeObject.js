const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');

let model;
async function loadModel() {
  if (!model) model = await mobilenet.load();
}

module.exports = async function recognizeObject(imageBase64) {
  await loadModel();
  const buffer = Buffer.from(imageBase64, 'base64');
  const imageTensor = tf.node.decodeImage(buffer);
  const predictions = await model.classify(imageTensor);
  imageTensor.dispose();
  return predictions[0]?.className?.split(',')[0].toLowerCase() || 'unknown';
};


