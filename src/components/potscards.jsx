import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CartSlice";
import potsArray from "../api/pots";
import ItemCard from "./ItemCard";

const PotsCards = () => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = useCallback(
    (pot) => {
      dispatch(addItem(pot));
      setAddedToCart((prevState) => ({
        ...prevState,
        [pot.id]: true,
      }));
    },
    [dispatch]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 place-items-center">
      {potsArray.plant1.map((pot) => (
        <ItemCard
          key={pot.id}
          item={pot}
          onAddToCart={handleAddToCart}
          isAdded={addedToCart[pot.id] || false}
        />
      ))}
    </div>
  );
};

export default PotsCards;
