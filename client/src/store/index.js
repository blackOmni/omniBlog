import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialUserId = localStorage.getItem('userId');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: Boolean(initialUserId),
    userId: initialUserId || null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userId = null;
      localStorage.removeItem('userId');
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
