# Object-to-Learning Instant Tutor

Hackathon Project: **Point your phone camera at any object, and get instant explanations of its science, history, and math relevance.**

## Features

- **Object Recognition:** Snap a picture and the app identifies the object using machine learning.
- **Educational Info:** Displays science, history, and math facts about the recognized object.
- **Voice Explanation:** Tap a button to hear the explanation spoken aloud (Text-to-Speech).
- **Quiz Mode:** Test your knowledge with a short quiz about the object.

## Tech Stack

- **Frontend:** React Native (Expo), JavaScript
- **Backend:** Node.js, Express, TensorFlow.js (MobileNet image classification)

## Directory Structure

```
object-to-learning-tutor/
├── frontend/         # React Native app
│   ├── App.js
│   ├── components/
│   │   ├── CameraScreen.js
│   │   ├── ObjectInfoScreen.js
│   │   ├── VoiceButton.js
│   │   ├── QuizScreen.js
│   ├── api/
│   │   └── objectApi.js
│   └── assets/
├── backend/          # Node.js server
│   ├── server.js
│   ├── routes/
│   │   ├── objectRoutes.js
│   │   └── quizRoutes.js
│   ├── controllers/
│   │   ├── objectController.js
│   │   └── quizController.js
│   ├── ml/
│   │   └── recognizeObject.js
│   ├── data/
│   │   ├── objects.json
│   │   └── quiz.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/object-to-learning-tutor.git
cd object-to-learning-tutor
```

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
expo start
```

Make sure the backend is running and accessible from your mobile device (use your computer's IP address in `objectApi.js`).

### 4. Usage

- Open the app on your phone (using Expo Go).
- Point the camera at an object and take a picture.
- View educational facts, play the voice explanation, and take the quiz.

## Team

- **Frontend:** Prajukta, Rishab
- **Backend:** Srija, Anushrita

## Notes

- For backend image recognition, MobileNet is used via TensorFlow.js.
- Expand the database (`objects.json`, `quiz.json`) to support more objects and quizzes.
- Use [ngrok](https://ngrok.com/) if you need to expose your local backend to your mobile device.

## License

MIT
