import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  info?: Record<string, any>; // Adjust the type according to your specific user info structure
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Record<string, any>>) => {
      state.info = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = userSlice.actions;

// Selector to get user info from the state
export const userSelector = (state: { user: UserState }) => state.user;

const user = userSlice.reducer;
export default user;
