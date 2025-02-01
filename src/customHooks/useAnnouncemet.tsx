import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from "../apis/announcementApis";

export const useAnnouncements = () => {
  const queryClient = useQueryClient();

  const { data: announcements, isLoading, error } = useQuery({
    queryKey: ["announcements"],
    queryFn: fetchAnnouncements,
    refetchOnWindowFocus: false,
    staleTime:5000000,
    refetchOnMount: false
  },);


  const createAnnouncementMutation = useMutation({
    mutationFn: (newAnnouncement:object) => createAnnouncement(newAnnouncement),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
    
  });

  const updateAnnouncementMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) => updateAnnouncement(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
    onError: (error: any) => {
      console.error("Update Announcement Error:", error.message);
    },
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
    onError: (error: any) => {
      console.error("Delete Announcement Error:", error.message);
    },
  });

  return {
    announcements,
    isLoading,
    error,
    createAnnouncement: createAnnouncementMutation,
    updateAnnouncement: updateAnnouncementMutation,
    deleteAnnouncement: deleteAnnouncementMutation,
  };
};
