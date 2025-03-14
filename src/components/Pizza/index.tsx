import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice/slice";
import { CartItem } from "../../redux/slices/cartSlice/types";
import { getCartItemByIdSelector } from "../../redux/slices/pizzaSlice/selectors";
import { Link } from "react-router-dom";

const typeNames = ["тонкое", "традиционное"];

type PizzaProps = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

const Pizza: React.FC<PizzaProps> = ({
  id,
  price,
  title,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();
  const item = useSelector(getCartItemByIdSelector(id));
  const pizzaCount = item ? item.count : 0;
  const [sizeActive, setSizeActive] = React.useState(0);
  const [typeActive, setTypeActive] = React.useState(0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[typeActive],
      size: sizes[sizeActive],
      count: 0,
    };
    dispatch(addItem(item));
  };

  function handleTypeClick(index: number) {
    setTypeActive(index);
  }

  function handleSizeClick(index: number) {
    setSizeActive(index);
  }
  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizza/${id}`}>
          {" "}
          <img className="pizza-block__image" src={imageUrl} alt="Index" />{" "}
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId, index) => (
              <li
                key={typeId}
                className={typeActive === index ? "active" : ""}
                onClick={() => handleTypeClick(index)}
              >
                {typeNames[index]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={size}
                className={sizeActive === index ? "active" : ""}
                onClick={() => handleSizeClick(index)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{price} руб.</div>
          <div
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {pizzaCount > 0 && <i>{pizzaCount}</i>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
