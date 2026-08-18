// src/store/index.js (or src/index.js)
import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUserId = localStorage.getItem('userId');
const initialUserName = localStorage.getItem('userName') || '';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: Boolean(initialUserId),
    userId: initialUserId || null,
    userName: initialUserName,
  },
  reducers: {
    login(state, action) {
      const payload = action.payload;
      // Extract _id and name whether payload is an object or a plain string ID
      const id =
        typeof payload === 'object' && payload !== null ? payload._id : payload;
      const name =
        typeof payload === 'object' && payload !== null ? payload.name : '';

      state.isLoggedIn = true;
      state.userId = id;
      state.userName = name || state.userName;

      if (id) localStorage.setItem('userId', id);
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

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDarkMode: JSON.parse(localStorage.getItem('isDarkMode')) || false,
  },
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
  },
});

export const authActions = authSlice.actions;
export const themeActions = themeSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer,
  },
});
