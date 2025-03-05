import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pizza from "../components/Pizza";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const url =
    "https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas";
  url.searchParams.append("sortBy", "title");
  React.useEffect(() => {
    fetch("https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas")
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
        window.scrollTo(0, 0);
      });
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
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
