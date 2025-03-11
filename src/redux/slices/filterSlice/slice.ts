import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterState } from "./types";

const initialState: FilterState = {
  searchValue: "",
  activeCategory: 0,
  sortType: 0,
  isReversed: false,
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory: (state, action: PayloadAction<number>) => {
      state.activeCategory = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortType: (state, action: PayloadAction<number>) => {
      state.sortType = action.payload;
    },
    setIsReversed: (state, action: PayloadAction<boolean>) => {
      state.isReversed = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
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
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
