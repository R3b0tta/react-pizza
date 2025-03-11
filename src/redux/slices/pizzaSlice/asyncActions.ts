import { createAsyncThunk } from "@reduxjs/toolkit";
import { PizzaItem, PizzaParams, SearchParams } from "./types";
import axios from "axios";

export const fetchPizzas = createAsyncThunk<PizzaItem[], PizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { activeCategory, sortType, searchValue, currentPage, isReversed } =
      params;
    const sortTypes = ["rating", "price", "title"];

    const response = await axios.get<PizzaItem[]>(
      "https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas",
      {
        params: {
          ...(activeCategory > 0 && { category: activeCategory }),
          sortBy: sortTypes[sortType],
          search: searchValue,
          page: currentPage,
          limit: 4,
        },
      },
    );

    const result = Array.isArray(response.data) ? response.data : [];
    return isReversed ? result.reverse() : result;
  },
);

export const fetchSearch = createAsyncThunk<PizzaItem[], SearchParams>(
  "pizza/fetchPizzasSearch",
  async (params) => {
    const { searchValue, currentPage } = params;
    const response = await axios.get<PizzaItem[]>(
      "https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas",
      {
        params: {
          search: searchValue,
          limit: 4,
          page: currentPage,
        },
      },
    );

    return Array.isArray(response.data) ? response.data : [];
  },
);
