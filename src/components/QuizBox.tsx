import {  Typography, Paper, Button } from '@mui/material';
import { IQuiz } from '../interfaces/quizInterface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function QuizBox({ quiz }: { quiz: IQuiz }) {
    const userData = useSelector((state: RootState) => state.auth.userData);
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" fontWeight="bold">{quiz.title}</Typography>
      <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
        Duration: {quiz.duration} mins | Passing Score: {quiz.passingScore}%
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Course: {quiz.course?.name || quiz.course}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Due Date: {formatDate(quiz.dueDate)}
      </Typography>

      {
        userData?.role === "student" && quiz.score !== undefined ?
        (
          <Typography variant="body2" sx={{ mt: 1 ,color: `${quiz.score >= quiz.passingScore ? "green" : "red"}` }}>
            Your Score: {quiz.score}%
          </Typography>
        )
        : userData?.role === "student"&&(
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.location.href = `/student/quizzes/${quiz._id}`}>Take Quiz</Button>
        )
      }
    </Paper>
  );
}
