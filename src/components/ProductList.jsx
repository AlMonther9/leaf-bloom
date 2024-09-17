import React, { useState, useCallback, useMemo } from "react";
import { addItem } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import plantsArray from "../api/products";
import { VintagePlantBackground } from "./UI/ThemedPlantBg";


const PlantCard = React.memo(({ plant, onAddToCart, isAdded }) => (
  <div className="w-full max-w-sm h-[350px] mb-5 p-3 bg-gradient-to-br from-neutral-500 border border-gray-300 rounded-md text-center relative hover:scale-105 transition-transform duration-300 ease-in-out z-10 flex flex-col justify-between">
    <div>
      <img
        className="w-full h-48 object-cover mb-2.5 rounded-lg"
        src={plant.image}
        alt={plant.name}
      />
      <div className="font-bold mb-2.5">{plant.name}</div>
      <div className="mb-2.5">{plant.description}</div>
    </div>
    <div>
      <div className="text-red-600 text-lg mt-auto">{plant.cost}</div>
      <button
        className={`bg-green-600 text-white border-none rounded-lg py-2.5 px-5 cursor-pointer transition-colors duration-300 ease-in-out ${
          isAdded ? "bg-gray-500" : "hover:bg-green-700"
        }`}
        onClick={() => onAddToCart(plant)}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  </div>
));

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
        <div key={index} className="w-full max-w-6xl">
          <h1 className="text-left font-bold text-2xl my-5">
            <div>{category.category}</div>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-5 place-items-center">
            {category.plants.map((plant, plantIndex) => (
              <PlantCard
                key={plantIndex}
                plant={plant}
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
    < VintagePlantBackground>
    <div className="flex flex-col w-full min-h-screen">
      <div className="flex items-center md:items-start mt-24 px-4 md:px-12 lg:px-24">
        <button
          onClick={handlePlantsClick}
          className="text-green-600 text-3xl no-underline"
        >
          Plants
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
    </div>
    </VintagePlantBackground>
  );
}

export default ProductList;
