import { createSlice } from "@reduxjs/toolkit";

const likedVideosSlice = createSlice({
  name: "likedVideos",
  initialState: {
    likedVideos: [],
    likedVideoIds: [],
    dislikedVideoIds: [],
  },
  reducers: {
    setLikedVideos: (state, action) => {
      // console.log(state);
      state.likedVideos.unshift(action.payload);
    },
    setLikedVideoIds: (state, action) => {
      // console.log(state);
      state.likedVideoIds.push(action.payload);
    },
    setDislikedVideoIds: (state, action) => {
      // console.log(state);
      state.dislikedVideoIds.push(action.payload);
    },
    removeDislikedVideoId: (state, action) => {
      state.dislikedVideoIds = state.dislikedVideoIds.filter(
        (id) => id !== action.payload
      );
    },
    removeLikedVideo: (state, action) => {
      state.likedVideoIds = state.likedVideoIds.filter(
        (id) => id !== action.payload
      );
      state.likedVideos = state.likedVideos.filter(
        (video) => video.id !== action.payload
      );
    },
  },
});

export const {
  setLikedVideos,
  setLikedVideoIds,
  removeLikedVideo,
  setDislikedVideoIds,
  removeDislikedVideoId,
} = likedVideosSlice.actions;

export default likedVideosSlice.reducer;
