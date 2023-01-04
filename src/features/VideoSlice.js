import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: null,
};

export const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setVideos: (state, p) => {
      state.videos = p.payload;
    },
  },
});

export const { setVideos } = VideoSlice.actions;

export const selectUser = (state) => state.user;

export default VideoSlice.reducer;