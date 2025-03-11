import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterSelector } from "../redux/slices/filterSlice/selectors";
import { setActiveCategory } from "../redux/slices/filterSlice/slice";

export default function Categories() {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector(filterSelector);
  const onClickCategory = (i: number) => dispatch(setActiveCategory(i));
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={activeCategory === index ? "active" : ""}
            onClick={() => onClickCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
