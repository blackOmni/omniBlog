// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialUserId = localStorage.getItem('userId') || null;
const initialUserName = localStorage.getItem('userName') || '';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: Boolean(initialUserId),
    userId: initialUserId,
    userName: initialUserName,
  },
  reducers: {
    login(state, action) {
      const { _id, name } = action.payload;
      state.isLoggedIn = true;
      state.userId = _id;
      state.userName = name || '';

      localStorage.setItem('userId', _id);
      if (name) localStorage.setItem('userName', name);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      state.userName = '';

      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
