import React from "react";

const ItemCard = React.memo(({ item, onAddToCart, isAdded }) => (
  <div className="w-full h-[450px] border relative border-beige rounded-lg shadow-2xl cursor-pointer text-center hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between text-tertiary text-lg text-pretty">
    <div className="relative">
      <img
        className="w-full h-96 object-cover mb-2.5 rounded-t-lg"
        src={item.image}
        alt={item.name}
      />
      <div className="text-green-950 text-2xl flex justify-end absolute top-2 right-2 z-10">
        <h2 className="bg-secondary bg-opacity-60 p-2 rounded-full">
          {item.price}
        </h2>
      </div>
    </div>
    <div className="font-bold flex justify-evenly">
      <h2>{item.name} </h2>
    </div>
    <div className="px-2 mb-2">{item.description || ""}</div>
    <div>
      <button
        className={`bg-darkpink text-white border-none rounded-lg py-2.5 -mb-8 px-5 cursor-pointer transition-colors duration-300 ease-in-out ${
          isAdded ? "bg-beige7" : "hover:bg-browny"
        }`}
        onClick={() => onAddToCart(item)}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  </div>
));

export default ItemCard;
