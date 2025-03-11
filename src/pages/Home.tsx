import React from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/Pizza/Skeleton";
import Pizza from "../components/Pizza";
import { Pagination } from "../components/Pagination";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/store";
import { pizzaSelector } from "../redux/slices/pizzaSlice/selectors";
import {
  fetchPizzas,
  fetchSearch,
} from "../redux/slices/pizzaSlice/asyncActions";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice/slice";
import { filterSelector } from "../redux/slices/filterSlice/selectors";
import { FilterState } from "../redux/slices/filterSlice/types";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(pizzaSelector);
  const { activeCategory, isReversed, sortType, currentPage } =
    useSelector(filterSelector);
  const { searchValue } = useSelector(filterSelector);
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
  async function getSearchPizzas() {
    dispatch(fetchSearch({ searchValue, currentPage }));
    window.scrollTo(0, 0);
  }

  React.useEffect(() => {
    if (window.location.search) {
      const parsedParams = qs.parse(window.location.search.substring(1));

      const filters: FilterState = {
        searchValue: parsedParams.searchValue as string,
        activeCategory: Number(parsedParams.activeCategory) || 0,
        sortType: Number(parsedParams.sortType) || 0,
        isReversed: parsedParams.isReversed === "true",
        currentPage: Number(parsedParams.currentPage) || 1,
      };

      dispatch(setFilters(filters));
      setReduxLoaded(true);
    } else {
      setReduxLoaded(true);
    }
  }, []);

  const onChangePage = (number: number) => dispatch(setCurrentPage(number));

  React.useEffect(() => {
    if (!isReduxLoaded && !isMounted) return;
    if (searchValue === "") {
      getPizzas();
    } else {
      getSearchPizzas();
    }
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

      {status === "error" ? (
        <div
          style={{
            margin: "10vh 0",
            padding: "0 23vh",
            width: "100%",
            display: "flex",
            textWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h2
            style={{ textAlign: "center", margin: "20px", lineHeight: "50px" }}
          >
            Ничего не найдено или произошла ошибка <span>😕</span>
          </h2>
          <h4>Можете попробовать снова позже.</h4>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading" ? (
              [...new Array(4)].map((_, i) => <Skeleton key={i} />)
            ) : items.length === 0 ? (
              <p
                style={{ textAlign: "center", fontSize: "18px", color: "#888" }}
              >
                Ничего не найдено
              </p>
            ) : (
              items.map((pizza: any) => <Pizza key={pizza.id} {...pizza} />)
            )}
          </div>
        </>
      )}
      <div className="container__pagination">
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </div>
  );
};

export default Home;
