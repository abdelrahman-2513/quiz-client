import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useQuizzes } from "../customHooks/useQuiz";

const TakeQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quiz, isLoading, submitQuiz } = useQuizzes(id);

  const [answers, setAnswers] = useState<{ questionId: string; selectedAnswer: string }[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(quiz?.duration * 60 || 0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (quiz?.duration) {
      setTimeLeft(quiz.duration * 60);
    }
  }, [quiz]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      const questionId = quiz.questions[currentQuestion]._id;
      const existingIndex = updatedAnswers.findIndex(a => a.questionId === questionId);
      
      if (existingIndex !== -1) {
        updatedAnswers[existingIndex].selectedAnswer = answer;
      } else {
        updatedAnswers.push({ questionId, selectedAnswer: answer });
      }
      
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestion < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || isSubmitted) return;
    setIsSubmitted(true);
    console.log({ quiz: quiz._id, answers });
    await submitQuiz.mutateAsync({ quiz: quiz._id, answers });
    navigate("/dashboard");
  };

  return (
    <Box sx={{ p: 3, maxWidth: "600px", margin: "auto" ,backgroundColor:"white",borderRadius:"8px",boxShadow:"0px 2px 4px rgba(0, 0, 0, 0.1)",display:"flex",flexDirection:"column"}}>
      {isLoading ? (
        <CircularProgress />
      ) : quiz ? (
        <>
          <Typography variant="h4" sx={{ mb: 2 }}>{quiz.title} ({quiz.course.name})</Typography>
          <Typography variant="body2" sx={{ color: "red", fontWeight: "bold", fontSize: "1.2rem", textAlign: "center", mb: 2 }}>
            Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6">{quiz.questions[currentQuestion]?.questionText}</Typography>
            <RadioGroup
              value={answers.find(a => a.questionId === quiz.questions[currentQuestion]._id)?.selectedAnswer || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
            >
              {quiz.questions[currentQuestion]?.options.map((option: string, optIndex: number) => (
                <FormControlLabel
                  key={optIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" onClick={handleBack} disabled={currentQuestion === 0}>
              Back
            </Button>
            {currentQuestion === quiz.questions.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSubmitted}>
                Submit Quiz
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Typography>No quiz found.</Typography>
      )}
    </Box>
  );
};

export default TakeQuiz;
