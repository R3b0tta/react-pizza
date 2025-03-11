import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status, PizzaState, PizzaItem } from "./types";
import { fetchPizzas, fetchSearch } from "./asyncActions";

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING,
};

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
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      },
    );
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
    builder.addCase(fetchSearch.pending, (state) => {
      state.items = [];
      state.status = Status.LOADING;
    });
    builder.addCase(
      fetchSearch.fulfilled,
      (state, action: PayloadAction<PizzaItem[]>) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      },
    );
    builder.addCase(fetchSearch.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
