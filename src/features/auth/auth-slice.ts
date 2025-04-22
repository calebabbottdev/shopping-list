import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    email: string | null;
    name: string | null;
  } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser: (
      state,
      action: PayloadAction<{ email: string; name: string } | null>,
    ) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
