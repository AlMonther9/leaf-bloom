import React from "react";
import { ShoppingCart, Check } from "lucide-react";

const ItemCard = React.memo(({ item, onAddToCart, isAdded }) => (
  <div className="relative flex flex-col justify-between w-full text-lg text-center transition-transform duration-300 ease-in-out border rounded-lg shadow-2xl cursor-pointer border-beige hover:scale-105 text-tertiary text-pretty">
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
          className={`bg-secondary bg-opacity-70 text-white border-none rounded-lg py-2 px-3 cursor-pointer transition-colors duration-300 ease-in-out ${
            isAdded ? "bg-tertiary" : "hover:bg-quaternary"
          }`}
          onClick={() => onAddToCart(item)}
        >
          {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
        </button>
      </div>
    </div>
    <div className="flex font-bold justify-evenly">
      <h2>{item.name} </h2>
    </div>
    <div className="h-12 px-2 mb-3">{item.description || ""}</div>
  </div>
));

export default ItemCard;
