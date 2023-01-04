import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/AuthSlice';
import VideoReducer from '../features/VideoSlice';

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Videos: VideoReducer,
  },
});
