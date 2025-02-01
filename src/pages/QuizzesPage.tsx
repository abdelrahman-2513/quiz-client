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
import { useQuizzes } from "../customHooks/useQuiz";
import { useCourses } from "../customHooks/useCourses";
import { ICourse } from "../interfaces/courseInterface";
import QuizBox from "../components/QuizBox";
import { IQuiz } from "../interfaces/quizInterface";
import AdminPageHeader from "../components/AdminPageHeader";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";





const QuizzesPage: React.FC = () => {
    const { quizzes, isLoading, createQuiz, updateQuiz, deleteQuiz } = useQuizzes("");
    const { courses } = useCourses();
    const userData = useSelector((state: RootState) => state.auth.userData);

    const [openDialog, setOpenDialog] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState<IQuiz>({
        _id: undefined,
        title: "",
        questions: [{ questionText: "", options: ["", "", "", ""], answer: "" }],
        duration: 0,
        passingScore: 0,
        course: "",
        dueDate: Date.now().toString(),
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleOpenDialog = (quiz?: IQuiz) => {
        if (quiz) {
            setEditingQuiz(quiz);
        } else {
            setEditingQuiz({
                _id: undefined,
                title: "",
                questions: [{ questionText: "", options: ["", "", "", ""], answer: "" }],
                duration: 0,
                passingScore: 0,
                course: "",
                dueDate: "",
            });
        }
        setErrorMessage(null);
        setOpenDialog(true);
    };
    const handleQuestionChange = (index: number, field: string, value: string, optionIndex?: number) => {
        setEditingQuiz((prev) => {
            const updatedQuestions = [...prev.questions];
            if (field === "options" && optionIndex !== undefined) {
                updatedQuestions[index].options[optionIndex] = value;
            } else {
                updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
            }
            return { ...prev, questions: updatedQuestions };
        });
    };

    const handleAddQuestion = () => {
        setEditingQuiz((prev) => ({
            ...prev,
            questions: [...prev.questions, { questionText: "", options: ["", "", "", ""], answer: "" }],
        }));
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setErrorMessage(null);
    };

    const handleSave = async () => {
        setErrorMessage(null);
        try {
            if (editingQuiz._id) {
                console.log(editingQuiz);
                await updateQuiz.mutateAsync({ id: editingQuiz._id, data: editingQuiz });
            } else {
                await createQuiz.mutateAsync(editingQuiz);
            }
            handleCloseDialog();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <AdminPageHeader userText="Quizzes" adminText="Manage Quizzes" handleOpenDialog={handleOpenDialog} />

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
                {isLoading ? (
                    <CircularProgress />
                ) : quizzes?.length > 0 ? (
                    quizzes.map((quiz: IQuiz) => (
                        <Paper key={quiz._id} sx={{ p: 2, mb: 2, display: "flex", flexDirection: "column", gap: 2, alignItems: "center",  backgroundColor:"transparent"}}>
                            <QuizBox quiz={quiz} />
                            {userData?.role !== "student" && <Box>
                                <IconButton color="primary" onClick={() => handleOpenDialog(quiz)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={() => deleteQuiz.mutateAsync(quiz._id as string)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>}
                        </Paper>
                    ))
                ) : (
                    <Typography>No quizzes found.</Typography>
                )}
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{editingQuiz._id ? "Edit Quiz" : "Add Quiz"}</DialogTitle>
                <DialogContent>
                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                    <TextField fullWidth label="Title" value={editingQuiz.title} onChange={(e) => setEditingQuiz({ ...editingQuiz, title: e.target.value })} margin="dense" />
                    <Select fullWidth value={editingQuiz.course?._id} onChange={(e) => setEditingQuiz({ ...editingQuiz, course: e.target.value })} displayEmpty>
                        <MenuItem value="" disabled>Select Course</MenuItem>
                        {courses?.map((course: ICourse) => (
                            <MenuItem key={course._id} value={course._id}>{course.name}</MenuItem>
                        ))}
                    </Select>
                    {editingQuiz.questions.map((question, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <TextField fullWidth label={`Question ${index + 1}`} value={question.questionText} onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)} margin="dense" />
                            <TextField fullWidth label={`Option 1`} value={question.options[0]} onChange={(e) => handleQuestionChange(index, "options", e.target.value, 0)} margin="dense" />
                            <TextField fullWidth label={`Option 2`} value={question.options[1]} onChange={(e) => handleQuestionChange(index, "options", e.target.value, 1)} margin="dense" />
                            <TextField fullWidth label={`Option 3`} value={question.options[2]} onChange={(e) => handleQuestionChange(index, "options", e.target.value, 2)} margin="dense" />
                            <TextField fullWidth label={`Option 4`} value={question.options[3]} onChange={(e) => handleQuestionChange(index, "options", e.target.value, 3)} margin="dense" />
                            <TextField fullWidth label={`Answer`} value={question.answer} onChange={(e) => handleQuestionChange(index, "answer", e.target.value)} margin="dense" />
                        </Box>
                    ))


                    }
                    <Button onClick={handleAddQuestion} color="primary">+ Add Question</Button>

                    <TextField fullWidth label="Due Date" type="date" InputLabelProps={{ shrink: true }} value={editingQuiz.dueDate} onChange={(e) => setEditingQuiz({ ...editingQuiz, dueDate: e.target.value })} margin="dense" />
                    <TextField fullWidth label="Duration (mins)" type="number" value={editingQuiz.duration} onChange={(e) => setEditingQuiz({ ...editingQuiz, duration: Number(e.target.value) })} margin="dense" />
                    <TextField fullWidth label="Passing Score (%)" type="number" value={editingQuiz.passingScore} onChange={(e) => setEditingQuiz({ ...editingQuiz, passingScore: Number(e.target.value) })} margin="dense" />



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default QuizzesPage;
