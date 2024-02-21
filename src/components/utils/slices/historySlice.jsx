import { createSlice } from "@reduxjs/toolkit";
import { videoId } from "../helper";

const historySlice = createSlice({
  name: history,
  initialState: {
    historyData: [],
  },
  reducers: {
    setVideoHistory: (state, action) => {
      const isVideoThere = state.historyData.find(
        (v) => videoId(v) === videoId(action.payload)
      );

      if (isVideoThere) {
        const filteredData = state.historyData.filter(
          (v) => videoId(v) !== videoId(action.payload)
        );
        filteredData.unshift(action.payload);
        state.historyData = filteredData;
      }

      if (isVideoThere === undefined) {
        state.historyData.unshift(action.payload);
      }
    },
  },
});

export const { setVideoHistory } = historySlice.actions;

export default historySlice.reducer;
