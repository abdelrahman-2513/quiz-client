import api from "./apiClient";

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/auth/signin", credentials);
  return response.data.authedUser;
};


export const logout = async () => {
  localStorage.removeItem("userToken");
};

export const fetchCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
