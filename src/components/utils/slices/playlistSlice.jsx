import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    "watch later": [],
  },
  reducers: {
    setPlayLists: (state, action) => {
      return {
        ...state,
        [action.payload.name]: [
          ...state[action.payload.name],
          action.payload.video,
        ],
      };
    },
    addNewList: (state, action) => {
      state = Object.assign(state, action.payload);
    },
    removeVideoFromPlaylist: (state, action) => {
      const playlistName = state[action.payload.name];
      const filteredState = playlistName.filter(
        (p) => p.id !== action.payload.video.id
      );
      return {
        ...state,
        [action.payload.name]: filteredState,
      };
    },
  },
});

export const { setPlayLists, addNewList, removeVideoFromPlaylist } =
  playlistSlice.actions;
export default playlistSlice.reducer;
