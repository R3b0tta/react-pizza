import React from "react";

export default function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  function handleCategoryClick(index) {
    setActiveCategory(index);
  }
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
            key={category}
            className={activeCategory === index ? "active" : ""}
            onClick={() => handleCategoryClick(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
