import api from "./apiClient";

export const createAnnouncement = async (announcementData: object) => {
  try {
    const response = await api.post("announcement", announcementData);
    
    return response.data; 
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      
      throw new Error(error.response.data.messages || "An error occurred while creating the announcement.");
    }
    throw new Error("Network error. Please try again.");
  }
};

export const fetchAnnouncements = async () => {
  try {
    const response = await api.get("announcement");
    console.log(response);
    return response.data.announcements;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch announcements.");
  }
};

export const updateAnnouncement = async (id: string, announcementData: object) => {
  try {
    const response = await api.patch(`announcement/${id}`, announcementData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update the announcement.");
  }
};

export const deleteAnnouncement = async (id: string) => {
  try {
    await api.delete(`announcement/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to delete the announcement.");
  }
};
