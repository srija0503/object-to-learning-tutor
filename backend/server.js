const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const objectRoutes = require('./routes/objectRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

app.use('/api/object', objectRoutes);
app.use('/api/quiz', quizRoutes);

app.listen(5000, () => console.log('Backend running on port 5000'));