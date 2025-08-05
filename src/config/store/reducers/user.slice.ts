import { IUser } from "@interfaces/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  token: string | null;
}

export interface UserState {
  user: IUser | null;
}

const initialState: UserState & TokenState = {
  user: null,
  token: localStorage.getItem("token"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
    },
    setProfilePicture: (state, action: PayloadAction<string | null>) => {
      if (state.user) {
        state.user.avatar = action.payload
      }
    },
    clearUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  setUser,
  clearUser,
  setToken,
  setProfilePicture
} = userSlice.actions;

export default userSlice.reducer;