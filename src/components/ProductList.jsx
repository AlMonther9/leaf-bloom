import React, { useState, useCallback, useMemo } from "react";
import { addItem } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import plantsArray from "../api/products";
import { VintagePlantBackground } from "./UI/ThemedPlantBg";
import PotsCards from "./potscards";
import ItemCard from "./ItemCard";

function ProductList() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const handlePlantsClick = useCallback((e) => {
    e.preventDefault();
    setShowCart(false);
  }, []);

  const handleAddToCart = useCallback(
    (plant) => {
      const itemToAdd = {
        ...plant,
        cost: plant.price,
      };
      dispatch(addItem(itemToAdd));
      setAddedToCart((prevState) => ({
        ...prevState,
        [plant.name]: true,
      }));
    },
    [dispatch]
  );
  const plantCategories = useMemo(() => {
    return plantsArray.map((category) => ({
      ...category,
      plants: category.plants.map((plant) => ({
        ...plant,
        isAdded: addedToCart[plant.name] || false,
      })),
    }));
  }, [addedToCart]);

  const renderPlantCategories = useCallback(
    () =>
      plantCategories.map((category, index) => (
        <div key={index} className="w-full">
          <h1 className="my-5 text-2xl font-bold text-left text-quaternary">
            <div>{category.category}</div>
          </h1>
          <div className="grid grid-cols-1 gap-12 p-5 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {category.plants.map((plant, plantIndex) => (
              <ItemCard
                key={plantIndex}
                item={plant}
                onAddToCart={handleAddToCart}
                isAdded={plant.isAdded}
              />
            ))}
          </div>
        </div>
      )),
    [plantCategories, handleAddToCart]
  );

  return (
    <VintagePlantBackground>
      <div className="flex flex-col min-h-screen px-4 mb-4 md:px-12 lg:px-24 ">
        <div className="flex items-center mt-16 md:items-start">
          <button
            onClick={handlePlantsClick}
            className="text-3xl font-bold no-underline text-quinary"
          >
            Plants By Category
          </button>
        </div>

        {showCart ? (
          {}
        ) : (
          <div className="flex flex-col items-center justify-center">
            {plantCategories.length > 0 ? (
              renderPlantCategories()
            ) : (
              <div className="text-2xl text-center text-gray-600">
                No plants available. Please check back later.
              </div>
            )}
          </div>
        )}
        <h3 className="my-8 text-3xl font-bold text-quinary">Pots</h3>
        <PotsCards />
      </div>
    </VintagePlantBackground>
  );
}

export default ProductList;
