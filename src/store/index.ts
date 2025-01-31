import { configureStore } from '@reduxjs/toolkit';

import userReducer from './modules/userDetails';
import quizUserInfo from './modules/quizUserInfo';

// Define RootState type based on the store's state
export const store = configureStore({
  reducer: {
    user: userReducer,
    quizUserInfo: quizUserInfo,
  },
});

// Define the RootState type (this is the type of your Redux store's state)
export type RootState = ReturnType<typeof store.getState>;

// Define the Dispatch type (optional, useful for typing dispatch calls)
export type AppDispatch = typeof store.dispatch;
