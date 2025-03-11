import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice/slice";
import pizzaSlice from "./slices/pizzaSlice/slice";
import cartSlice from "./slices/cartSlice/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    pizzaSlice,
    cartSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
