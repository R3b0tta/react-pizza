export type CartItem = {
  id: string;
  title: string;
  type: string;
  price: number;
  count: number;
  size: number;
  imageUrl: string;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
  itemsLength: number;
}
