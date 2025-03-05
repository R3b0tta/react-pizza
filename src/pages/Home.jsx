import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pizza from "../components/Pizza";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [sortType, setSortType] = React.useState(0);
  const [isReversed, setIsReversed] = React.useState(false);

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
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        isReversed ? setItems(json.reverse()) : setItems(json);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, [activeCategory, sortType, isReversed]);
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
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <Pizza key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};
export default Home;
