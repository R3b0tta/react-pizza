import React from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pizza from "../components/Pizza";
import { Pagination } from "../components/Pagination";
import { AppContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.pizzaSlice);
  const { activeCategory, isReversed, sortType, currentPage } = useSelector(
    (state) => state.filterSlice,
  );
  const { searchValue } = React.useContext(AppContext);
  const [isReduxLoaded, setReduxLoaded] = React.useState(false);
  const isMounted = React.useRef(false);
  async function getPizzas() {
    dispatch(
      fetchPizzas({
        activeCategory,
        sortType,
        searchValue,
        currentPage,
        isReversed,
      }),
    );
    window.scrollTo(0, 0);
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(setFilters(params));
      setReduxLoaded(true);
    } else {
      setReduxLoaded(true);
    }
  }, []);

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  React.useEffect(() => {
    if (!isReduxLoaded && !isMounted) return;
    getPizzas();
    isMounted.current = true;
  }, [activeCategory, sortType, isReversed, searchValue, currentPage]);

  React.useEffect(() => {
    if (!isReduxLoaded) return;

    if (isMounted.current) {
      const queryString = qs.stringify({
        currentPage,
        sortType,
        activeCategory,
        isReversed,
      });
      navigate(`?${queryString}`);
    }
  }, [activeCategory, sortType, currentPage, isReversed]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div>
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>Мы очень сожалеем и значем об ошибке, зайдите чуть позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? (
            [...new Array(4)].map((_, i) => <Skeleton key={i} />)
          ) : items.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "18px", color: "#888" }}>
              Ничего не найдено
            </p>
          ) : (
            items.map((pizza) => <Pizza key={pizza.id} {...pizza} />)
          )}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
