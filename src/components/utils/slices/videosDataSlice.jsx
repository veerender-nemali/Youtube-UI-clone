import { createSlice } from "@reduxjs/toolkit";

const videosDataSlice = createSlice({
  name: "videosInfo",
  initialState: {
    videosData: [],
    relatedVideosContent: [],
    watchPageVideoId: null,
  },
  reducers: {
    setVideosData: (state, action) => {
      state.videosData.push(action.payload);
    },
    setRealatedVideosContent: (state, action) => {
      state.relatedVideosContent.push(action.payload);
    },
    setWatchPageVideoId: (state, action) => {
      state.watchPageVideoId = action.payload;
      // console.log(action.payload);
    },
    cleanRelatedVideosContent: (state) => {
      state.relatedVideosContent = [];
    },
  },
});

export const {
  setVideosData,
  setRealatedVideosContent,
  cleanRelatedVideosContent,
  setWatchPageVideoId,
} = videosDataSlice.actions;
export default videosDataSlice.reducer;
