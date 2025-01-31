import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Quiz {
  id: number;
  title: string;
  dueDate: string;
}

interface Announcement {
  id: number;
  message: string;
  date: string;
}

interface StudentDataState {
  quizzes: Quiz[];
  announcements: Announcement[];
}

const initialState: StudentDataState = { quizzes: [], announcements: [] };

const studentDataSlice = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    setAnnouncements: (state, action: PayloadAction<Announcement[]>) => {
      state.announcements = action.payload;
    },
  },
});

export const { setQuizzes, setAnnouncements } = studentDataSlice.actions;
export default studentDataSlice.reducer;
