import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import objectApi from '../api/objectApi';

export default function QuizScreen({ route, navigation }) {
  const { object } = route.params;
  const [quiz, setQuiz] = useState(null);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchQuiz() {
      const q = await objectApi.getQuiz(object);
      setQuiz(q);
    }
    fetchQuiz();
  }, []);

  if (!quiz) return <Text>Loading...</Text>;
  if (step >= quiz.questions.length)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text>Your score: {score} / {quiz.questions.length}</Text>
        <Button title="Back to Info" onPress={() => navigation.goBack()} />
      </View>
    );

  const q = quiz.questions[step];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Text>{q.question}</Text>
      {q.options.map((opt, i) => (
        <Button key={i} title={opt} onPress={() => {
          if (opt === q.answer) setScore(score + 1);
          setStep(step + 1);
        }} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 }
});