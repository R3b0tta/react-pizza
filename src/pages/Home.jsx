import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pizza from "../components/Pizza";
import { Pagination } from "../components/Pagination";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../redux/slices/pizzaSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.pizzaSlice);
  const { activeCategory, isReversed, sortType } = useSelector(
    (state) => state.filterSlice,
  );
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { searchValue } = React.useContext(AppContext);

  React.useEffect(() => {
    setIsLoading(true);
    const url = new URL(
      "https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas",
    );
    if (activeCategory > 0) {
      url.searchParams.append("category", activeCategory);
    }
    const sortTypes = ["rating", "price", "title"];
    url.searchParams.append("sortBy", sortTypes[sortType]);
    url.searchParams.append("search", searchValue);
    url.searchParams.append("page", currentPage);
    url.searchParams.append("limit", 4);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        const data = Array.isArray(json) ? json : [];
        dispatch(setItems(isReversed ? data.reverse() : data));
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [activeCategory, sortType, isReversed, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(4)].map((_, i) => <Skeleton key={i} />)
        ) : items.length === 0 ? (
          <p style={{ textAlign: "center", fontSize: "18px", color: "#888" }}>
            Ничего не найдено
          </p>
        ) : (
          items.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
        )}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
export default Home;
