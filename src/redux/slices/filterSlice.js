import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCategory: 0,
  sortType: 0,
  isReversed: false,
  currentPage: 1,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.currentPage = Number(action.payload.currentPage);
      state.isReversed = action.payload.isReversed;
      state.sortType = Number(action.payload.sortType);
      state.activeCategory = Number(action.payload.activeCategory);
    },
  },
});

export const {
  setActiveCategory,
  setSortType,
  setIsReversed,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
