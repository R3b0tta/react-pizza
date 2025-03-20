import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [data, setData] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await axios.get(
        "https://6785cbe9f80b78923aa47299.mockapi.io/api/react-pizza/pizzas",
        {
          params: { id },
        },
      );
      setData(response.data[0]);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      navigate("/");
    }
  }
  React.useEffect(() => {
    getData();
  }, []);

  if (!data) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className="container">
      <img src={data.imageUrl} alt="" />
      <h2>{data.title}</h2>
      <h4>{data.price}</h4>
    </div>
  );
};

export default FullPizza;
