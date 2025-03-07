import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sortType: 0,
  isReversed: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setIsReversed: (state, action) => {
      state.isReversed = action.payload;
    },
  },
});

export const { setActiveCategory, setSortType, setIsReversed } =
  filterSlice.actions;

export default filterSlice.reducer;
