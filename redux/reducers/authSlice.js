import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: typeof window !== "undefined" ? window.localStorage.getItem('token') : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setToken , clearToken } = authSlice.actions;

export default authSlice.reducer;
