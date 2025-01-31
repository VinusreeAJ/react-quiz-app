import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for the user slice state
interface UserState {
  userName: string;
  avatarUrl: string;
  modalOpen: boolean;
}

// Define the initial state with the UserState type
const initialState: UserState = {
  userName: '',
  avatarUrl: '',
  modalOpen: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set user name
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    // Set avatar URL
    setAvatarUrl(state, action: PayloadAction<string>) {
      state.avatarUrl = action.payload;
    },
    // Toggle modal visibility
    toggleModal(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
  },
});

// Export actions to dispatch
export const { setUserName, setAvatarUrl, toggleModal } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
