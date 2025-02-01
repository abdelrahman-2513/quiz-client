import api from "./apiClient";

export const createQuiz = async (quizData: object) => {
  try {
    const response = await api.post("quiz", quizData);
    
    return response.data; 
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      
      throw new Error(error.response.data.messages || "An error occurred while creating the quiz.");
    }
    throw new Error("Network error. Please try again.");
  }
};

export const fetchQuizzes = async () => {
  try {
    const response = await api.get("quiz");
    console.log(response);
    return response.data.quizzes;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch quizs.");
  }
};

export const updateQuiz = async (id: string, quizData: object) => {
  try {
    const response = await api.patch(`quiz/${id}`, quizData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update the quiz.");
  }
};

/**
 * Fetches a specific quiz by its ID.
 *
 * @param id - The unique identifier of the quiz to fetch.
 * @returns The data of the fetched quiz.
 * @throws Will throw an error if the request fails or the quiz cannot be fetched.
 */

export const fetchQuiz = async (id: string) => {
  try {
    const response = await api.get(`quiz/${id}`);
    console.log(response);
    return response.data.quiz;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update the quiz.");
  }
};

export const submitQuiz = async (submittedQuiz: object) => {
    try {
        const response = await api.post("quiz-result", submittedQuiz);
        
        return response.data; 
      } catch (error: any) {
        console.error(error);
        if (error.response) {
          
          throw new Error(error.response.data.messages || "An error occurred while creating the quiz.");
        }
        throw new Error("Network error. Please try again.");
      }
}

export const deleteQuiz = async (id: string) => {
  try {
    await api.delete(`quiz/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete the quiz.");
  }
};
