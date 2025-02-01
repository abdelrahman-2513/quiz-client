import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse, deleteCourse, fetchCourses, updateCourse } from "../apis/coursesApis";

export const useCourses = () => {
  const queryClient = useQueryClient();

  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    refetchOnWindowFocus: false,
    staleTime:5000000,
    refetchOnMount: false
  });

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: object }) => updateCourse(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["courses"] }),
  });

  return {
    courses,
    isLoading,
    error,
    createCourse: createCourseMutation,
    updateCourse: updateCourseMutation,
    deleteCourse: deleteCourseMutation,
  };
};
