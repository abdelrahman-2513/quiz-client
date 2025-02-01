import api from "./apiClient";

export const fetchQuizzes = async () => {
  const response = await api.get("/quizzes");
  return response.data;
};

export const fetchAnnouncements = async () => {
  const response = await api.get("/announcements");
  return response.data;
};
