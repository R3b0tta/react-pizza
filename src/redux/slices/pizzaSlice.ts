import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface PizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: number;
  rating: number;
}

export type PizzaParams = {
  activeCategory: number;
  sortType: number;
  searchValue: string;
  currentPage: number;
  isReversed: boolean;
};

interface PizzaState {
  items: PizzaItem[];
  status: "loading" | "success" | "error";
}

const initialState: PizzaState = {
  items: [],
  status: "loading",
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], PizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { activeCategory, sortType, searchValue, currentPage, isReversed } =
      params;
    const sortTypes = ["rating", "price", "title"];

    const response = await axios.get<PizzaItem[]>(
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

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.status = "loading";
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = "success";
      },
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export const pizzaSelector = (state: RootState) => state.pizzaSlice;
export const getCartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);

export default pizzaSlice.reducer;
