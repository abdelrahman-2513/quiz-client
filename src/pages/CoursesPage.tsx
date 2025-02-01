import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCourses } from "../customHooks/useCourses";
import { useUsers } from "../customHooks/useUsers";
import AdminPageHeader from "../components/AdminPageHeader";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ICourse } from "../interfaces/courseInterface";


const CoursesPage: React.FC = () => {
  const { courses, isLoading, createCourse, updateCourse, deleteCourse } = useCourses();
  const { users } = useUsers();
  const userData = useSelector((state: RootState) => state.auth.userData);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState<ICourse>({ _id: undefined, name: "", teacher: "", students: [] });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOpenDialog = (course?: ICourse) => {
    if (course) {
      setEditingCourse(course);
    } else {
      setEditingCourse({ _id: undefined, name: "", teacher: "", students: [] });
    }
    setErrorMessage(null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setErrorMessage(null);
  };

  const handleSave = async () => {
    setErrorMessage(null);
    try {
      if (editingCourse._id) {
        await updateCourse.mutateAsync({ id: editingCourse._id, data: editingCourse });
      } else {
        await createCourse.mutateAsync(editingCourse);
      }
      handleCloseDialog();
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <AdminPageHeader userText="Courses" adminText="Manage Courses" handleOpenDialog={handleOpenDialog} />

      {isLoading ? (
        <CircularProgress />
      ) : courses?.length > 0 ? (
        courses.map((course: ICourse) => (
          <Paper key={course._id} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">{course.name}</Typography>
              <Typography variant="body2">Teacher: {course.teacher?.name || "N/A"}</Typography>
              <Typography variant="body2">
                Students:{" "}
                {course.students && course.students.length > 0
                  ? course.students.map(studentId => studentId?.name || "Unknown").join(", ")
                  : "None"}
              </Typography>
            </Box>
           {userData?.role === "admin" && <Box>
              <IconButton color="primary" onClick={() => handleOpenDialog(course)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => deleteCourse.mutateAsync(course._id as string)}>
                <DeleteIcon />
              </IconButton>
            </Box>}
          </Paper>
        ))
      ) : (
        <Typography>No courses found.</Typography>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}  >
        <DialogTitle>{editingCourse._id ? "Edit Course" : "Add Course"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" ,gap:2}}>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <TextField fullWidth label="Name" value={editingCourse.name} onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })} margin="dense" />
          
          <Select
            fullWidth
            sx={{ mt: 2 }}
            value={editingCourse.teacher}
            onChange={(e) => setEditingCourse({ ...editingCourse, teacher: e.target.value })}
            displayEmpty
          >
             <MenuItem value="" disabled>Select Teacher</MenuItem>
            {Array.isArray(users) &&
              users.filter((user) => user.role === "teacher").map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>

          <Select
            fullWidth
            multiple
            sx={{ width: "350px" }}
            value={editingCourse.students || []}
            onChange={(e) => setEditingCourse({ ...editingCourse, students: e.target.value as string[] })}
          
          >
            <MenuItem value="" disabled>Select Students</MenuItem>
            {Array.isArray(users) &&
              users.filter((user) => user.role === "student").map((user) => (
                <MenuItem key={user._id} value={user._id}>
                  {user.name}
                </MenuItem>
              ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesPage;
