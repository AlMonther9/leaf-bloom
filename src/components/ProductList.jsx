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

  const handleContinueShopping = useCallback(() => {
    setShowCart(false);
  }, []);

  const handleAddToCart = useCallback(
    (plant) => {
      dispatch(addItem(plant));
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
          <h1 className="text-left font-bold text-2xl my-5 text-quaternary">
            <div>{category.category}</div>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 place-items-center">
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
      <div className="flex flex-col px-4 md:px-12 lg:px-24 min-h-screen">
        <div className="flex items-center md:items-start mt-24">
          <button
            onClick={handlePlantsClick}
            className="text-quinary text-3xl no-underline font-bold"
          >
            Plants By Category
          </button>
        </div>

        {showCart ? (
          {
            /* <CartItem onContinueShopping={handleContinueShopping} /> */
          }
        ) : (
          <div className="flex flex-col items-center justify-center">
            {plantCategories.length > 0 ? (
              renderPlantCategories()
            ) : (
              <div className="text-center text-2xl text-gray-600">
                No plants available. Please check back later.
              </div>
            )}
          </div>
        )}
        <h3 className="text-3xl text-quinary my-8 font-bold">Pots</h3>
        <PotsCards />
      </div>
    </VintagePlantBackground>
  );
}

export default ProductList;
