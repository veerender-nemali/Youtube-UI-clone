import { createSlice } from "@reduxjs/toolkit";

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState: {
    subscribedChannels: [],
  },
  reducers: {
    setSubscribedChannels: (state, action) => {
      state.subscribedChannels.unshift(action.payload);
    },
    unSubcribe: (state, action) => {
      state.subscribedChannels = state.subscribedChannels.filter(
        (x) => x.id !== action.payload
      );
    },
  },
});

export const { setSubscribedChannels, unSubcribe } = subscribeSlice.actions;

export default subscribeSlice.reducer;
