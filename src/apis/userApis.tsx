import api from "./apiClient";

export const createUser = async (userData: object) => {
  try {
    const response = await api.post("user", userData);
    
    return response.data; 
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      
      throw new Error(error.response.data.messages || "An error occurred while creating the user.");
    }
    throw new Error("Network error. Please try again.");
  }
};

export const fetchUsers = async () => {
  try {
    const response = await api.get("user");
    console.log(response);
    return response.data.users;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch users.");
  }
};

export const updateUser = async (id: string, userData: object) => {
  try {
    const response = await api.patch(`user/${id}`, userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update the user.");
  }
};

export const deleteUser = async (id: string) => {
  try {
    await api.delete(`user/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete the user.");
  }
};
