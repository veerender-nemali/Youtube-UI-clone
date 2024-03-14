import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: {}, //here we are using object because its time complexity O(1) than array in searching an element
    searchInpValue: "",
  },
  reducers: {
    // cacheResults: (state, action) => {
    //   state.searchResults = Object.assign(state, action.payload);
    // },
    cacheResults: (state, action) => {
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          ...action.payload,
        },
      };
    },

    setSearchInpValue: (state, action) => {
      console.log(state.searchInpValue);
      return {
        ...state,
        searchInpValue: action.payload,
      };
    },
  },
});

export const { cacheResults, setSearchInpValue } = searchSlice.actions;

export default searchSlice.reducer;
