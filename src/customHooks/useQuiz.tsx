import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchQuizzes, createQuiz, updateQuiz, deleteQuiz, submitQuiz, fetchQuiz } from "../apis/quizApis";

export const useQuizzes = (id: any) => {
  const queryClient = useQueryClient();

  const { data: quizzes, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: fetchQuizzes,
    refetchOnWindowFocus: false,
    staleTime:5000000,
    refetchOnMount: false
  });
  const { data: quiz, isLoading : isQuizLoading, error:isQuizError } = useQuery({
    queryKey: ["quiz", id],
    queryFn: ()=> id && fetchQuiz(id),
    refetchOnWindowFocus: false,
    staleTime:5000000,
    refetchOnMount: false
  });

  const createQuizMutation = useMutation({
    mutationFn: createQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });

  const updateQuizMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) => updateQuiz(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });

  const submitQuizMutation = useMutation({
    mutationFn:  submitQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });

  const deleteQuizMutation = useMutation({
    mutationFn: deleteQuiz,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["quizzes"] }),
  });

  return {
    quizzes,
    quiz,
    isLoading: isLoading || isQuizLoading,
    error,
    isQuizError,
    submitQuiz: submitQuizMutation,
    createQuiz: createQuizMutation,
    updateQuiz: updateQuizMutation,
    deleteQuiz: deleteQuizMutation,
  };
};
