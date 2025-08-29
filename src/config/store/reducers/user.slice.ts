import { IUser } from "@interfaces/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TokenState {
  token: string | null;
}

export interface UserState {
  user: IUser | null;
  isValidating: boolean; // <-- AÑADIR
}

const initialState: UserState & TokenState = {
  user: null,
  token: localStorage.getItem("token"),
  isValidating: true, // <-- INICIAR EN TRUE POR DEFECTO
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
      state.isValidating = false; // <-- FINALIZAR VALIDACIÓN
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
      state.isValidating = false; // <-- FINALIZAR VALIDACIÓN
    },
    // Si necesitas controlar la validación manualmente en algún punto
    setValidating: (state, action: PayloadAction<boolean>) => {
      state.isValidating = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setToken,
  setProfilePicture,
  setValidating, // <-- EXPORTAR
} = userSlice.actions;

export default userSlice.reducer;