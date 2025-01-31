import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Answer {
  answer: string;
  timeTaken: number;
}

interface UserState {
  answers: Answer[];
  score: number;
}

const initialState: UserState = {
  answers: [],
  score: 0,
};

const quizUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionIndex: number; answer: string; timeTaken: number }>) => {
      const { questionIndex, answer, timeTaken } = action.payload;
      state.answers[questionIndex] = { answer, timeTaken };

      const score = timeTaken <= 10 ? 10 : 5; // Adjust scoring logic as needed
      state.score += score;
    },
  },
});

export const { setAnswer } = quizUserSlice.actions;
export default quizUserSlice.reducer;
