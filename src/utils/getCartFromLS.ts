import { CartSliceState } from "../redux/slices/cartSlice/types";

export const getCartFromLs = () => {
  const data = localStorage.getItem("cart");
  return data
    ? (JSON.parse(data) as CartSliceState)
    : { totalPrice: 0, items: [], itemsLength: 0 };
};
