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
