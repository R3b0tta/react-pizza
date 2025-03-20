import { z } from "zod";

export interface PizzaItem {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: number;
  rating: number;
}
export const fetchCartItemScheme = z.object({
  id: z.string(),
  title: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  category: z.number(),
  rating: z.number(),
});

export type fetchCartItem = z.infer<typeof fetchCartItemScheme>;

export type PizzaParams = {
  activeCategory: number;
  sortType: number;
  currentPage: number;
  isReversed: boolean;
};
export type SearchParams = {
  searchValue: string;
  currentPage: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaState {
  items: PizzaItem[];
  status: Status;
}
