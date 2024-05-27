import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    username: string;
    token: string;
  };

  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    username: "",
    token: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        username: string;
        token: string;
      }>,
    ) => {
      const { username, token } = action.payload;
      state.user = { username, token };
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = {
        username: "",
        token: "",
      };
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
