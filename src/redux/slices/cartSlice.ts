import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  count: number;
  size: number;
  imageUrl: string;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  itemsLength: number;
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  itemsLength: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
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
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      const removedItem = state.items[index];
      state.items.splice(index, 1);
      state.itemsLength -= removedItem.count;
      state.totalPrice -= removedItem.price * removedItem.count;
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items[index].count -= 1;
      state.itemsLength -= 1;
      state.totalPrice -= state.items[index].price;
      if (state.items[index].count === 0) {
        state.items.splice(index, 1);
      }
    },
    clearItems: (state) => {
      state.totalPrice = 0;
      state.itemsLength = 0;
      state.items = [];
    },
  },
});

export const cartSelector = (state: RootState) => state.cartSlice;

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
