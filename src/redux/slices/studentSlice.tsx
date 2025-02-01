import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IQuiz } from "../../interfaces/quizInterface";
import { IAnnouncement } from "../../interfaces/announcementInterface";


interface StudentDataState {
  quizzes: IQuiz[];
  announcements: IAnnouncement[];
}

const initialState: StudentDataState = { quizzes: [], announcements: [] };

const studentDataSlice = createSlice({
  name: "studentData",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<IQuiz[]>) => {
      state.quizzes = action.payload;
    },
    setAnnouncements: (state, action: PayloadAction<IAnnouncement[]>) => {
      state.announcements = action.payload;
    },
  },
});

export const { setQuizzes, setAnnouncements } = studentDataSlice.actions;
export default studentDataSlice.reducer;
