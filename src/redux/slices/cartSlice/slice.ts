import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLs } from "../../../utils/getCartFromLS";
import { CartSliceState, CartItem } from "./types";

const { totalPrice, items, itemsLength } = getCartFromLs();

const initialState: CartSliceState = {
  totalPrice,
  items,
  itemsLength,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        findItem.count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice += action.payload.price;
      state.itemsLength += 1;
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; type: string; size: number }>,
    ) => {
      const index = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (index !== -1) {
        const removedItem = state.items[index];
        state.items.splice(index, 1);
        state.itemsLength -= removedItem.count;
        state.totalPrice -= removedItem.price * removedItem.count;
      }
    },
    minusItem: (
      state,
      action: PayloadAction<{ id: string; type: string; size: number }>,
    ) => {
      const index = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (index !== -1) {
        state.items[index].count -= 1;
        state.itemsLength -= 1;
        state.totalPrice -= state.items[index].price;

        if (state.items[index].count === 0) {
          state.items.splice(index, 1);
        }
      }
    },
    clearItems: (state) => {
      state.totalPrice = 0;
      state.itemsLength = 0;
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
