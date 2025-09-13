import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function QuizScreen({ route, navigation }) {
  const { quizData } = route.params; // received from ObjectInfoScreen
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No quiz available for this object.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  // Quiz complete
  if (step >= quizData.questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text>Your score: {score} / {quizData.questions.length}</Text>
        <Button title="Back to Info" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const currentQuestion = quizData.questions[step];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((opt, i) => (
        <Button
          key={i}
          title={opt}
          onPress={() => {
            if (opt === currentQuestion.answer) setScore(score + 1);
            setStep(step + 1);
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  question: { fontSize: 18, marginVertical: 10 },
});
