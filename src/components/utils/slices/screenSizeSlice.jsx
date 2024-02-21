// screenSizeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const screenSizeSlice = createSlice({
  name: 'screenSize',
  initialState: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  reducers: {
    setScreenSize: (state, action) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export const { setScreenSize } = screenSizeSlice.actions;
export default screenSizeSlice.reducer;
