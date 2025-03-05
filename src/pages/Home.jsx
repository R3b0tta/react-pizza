import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pizza from "../components/Pizza";
import ReactPaginate from "react-paginate";
import { Pagination } from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);
  const [isReversed, setIsReversed] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

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
        setItems(isReversed ? data.reverse() : data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [activeCategory, sortType, isReversed, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={activeCategory}
          onClickCategory={(i) => setActiveCategory(i)}
        />
        <Sort
          value={sortType}
          onClickSortType={(i) => setSortType(i)}
          changeReverse={() => setIsReversed(!isReversed)}
          isUp={isReversed}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? (
          [...new Array(6)].map((_, i) => <Skeleton key={i} />)
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
