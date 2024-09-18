import React from "react";
import { ShoppingCart, Check } from "lucide-react";

const ItemCard = React.memo(({ item, onAddToCart, isAdded }) => (
  <div className="w-full h-[500px] border relative border-beige rounded-lg shadow-2xl cursor-pointer text-center hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col justify-between text-tertiary text-lg text-pretty">
    <div className="relative">
      <img
        className="w-full h-96 object-cover mb-2.5 rounded-t-lg"
        src={item.image}
        alt={item.name}
      />
      <div className="absolute z-10 flex justify-between w-full gap-2 pl-5 text-2xl text-green-950 top-2 right-2">
        <h2 className="p-2 rounded-full bg-secondary bg-opacity-60">
          {item.price}
        </h2>
        <button
          className={`bg-darkpink text-white border-none rounded-lg py-2.5 px-5 cursor-pointer transition-colors duration-300 ease-in-out ${
            isAdded ? "bg-beige7" : "hover:bg-browny"
          }`}
          onClick={() => onAddToCart(item)}
        >
          {isAdded ? (
            <Check size={20} />
          ) : (
            <ShoppingCart size={20} />
          )}
        </button>
      </div>
    </div>
    <div className="flex font-bold justify-evenly">
      <h2>{item.name} </h2>
    </div>
    <div className="px-2 mb-3">{item.description || ""}</div>
  </div>
));

export default ItemCard;