import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import pizzaSlice from "./slices/pizzaSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    filterSlice,
    pizzaSlice,
    cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
