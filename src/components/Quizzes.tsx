import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuizzes } from '../customHooks/useQuiz';
import { IQuiz } from '../interfaces/quizInterface';
import QuizBox from './QuizBox';

export default function Quizzes() {
  const { quizzes, isLoading: isLoadingQuizzes } = useQuizzes("");

  const latestQuiz = quizzes?.length
    ? [...quizzes].sort((a: IQuiz, b: IQuiz) => new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime())[0]
    : null;

  return (
    <Box sx={{ backgroundColor: "white",  width: {md:"calc(40% - 16px)",sx:"100%"}, borderRadius: 2, padding: 2, height: "100%" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Latest Quiz</Typography>
      {isLoadingQuizzes ? (
        <CircularProgress />
      ) : latestQuiz ? (
        <QuizBox key={latestQuiz._id} quiz={latestQuiz} />
      ) : (
        <Typography>No quizzes found.</Typography>
      )}
    </Box>
  );
}
