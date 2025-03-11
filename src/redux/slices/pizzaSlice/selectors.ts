import { RootState } from "../../store";

export const pizzaSelector = (state: RootState) => state.pizzaSlice;
export const getCartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cartSlice.items.find((obj) => obj.id === id);
