import api from "./apiClient";

export const createCourse = async (courseData: object) => {
  try {
    const response = await api.post("course", courseData);
    
    return response.data; 
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      
      throw new Error(error.response.data.messages || "An error occurred while creating the course.");
    }
    throw new Error("Network error. Please try again.");
  }
};

export const fetchCourses = async () => {
  try {
    const response = await api.get("course");
    console.log(response);
    return response.data.courses;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch courses.");
  }
};

export const updateCourse = async (id: string, courseData: object) => {
  try {
    const response = await api.patch(`course/${id}`, courseData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update the course.");
  }
};

export const deleteCourse = async (id: string) => {
  try {
    await api.delete(`course/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete the course.");
  }
};


