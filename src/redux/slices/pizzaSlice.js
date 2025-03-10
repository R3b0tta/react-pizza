import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { activeCategory, sortType, searchValue, currentPage, isReversed } =
      params;

    const sortTypes = ["rating", "price", "title"];

    const response = await axios.get(
      "https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas",
      {
        params: {
          ...(activeCategory > 0 && { category: activeCategory }),
          sortBy: sortTypes[sortType],
          search: searchValue,
          page: currentPage,
          limit: 4,
        },
      },
    );

    const result = Array.isArray(response.data) ? response.data : [];
    return isReversed ? result.reverse() : result;
  },
);

const initialState = {
  items: [],
  status: "loading", // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export const pizzaSelector = (state) => state.pizzaSlice;
export const getCartItemByIdSelector = (id) => (state) =>
  state.cartSlice.items.find((obj) => obj.id === id);

export default pizzaSlice.reducer;
