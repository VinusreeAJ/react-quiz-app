import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  answers: string[];
  timeTaken: number[]; // Store time taken for each question
  score: number;
}

const initialState: UserState = {
  answers: [],
  timeTaken: [],
  score: 0,
};

const quizUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionIndex: number, answer: string, timeTaken: number }>) => {
      const { questionIndex, answer, timeTaken } = action.payload;
      state.answers[questionIndex] = answer;
      state.timeTaken[questionIndex] = timeTaken;

      // Grade based on time taken (just an example, adjust scoring logic)
      const score = timeTaken <= 10 ? 10 : 5; // Example: 10 points if answered in 10 seconds, otherwise 5 points
      state.score += score;
    },
  },
});

export const { setAnswer } = quizUserSlice.actions;
export default quizUserSlice.reducer;
