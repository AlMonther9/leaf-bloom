import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VintagePlantBackground } from "../components/UI/ThemedPlantBg";
import { removeItem, updateQuantity } from "./CartSlice";
import {
  ArrowRight,
  BadgeX,
  SquarePlus,
  SquareMinus,
  ShoppingBasketIcon,
} from "lucide-react";
export const useCartItemsCount = () => {
  const cart = useSelector((state) => state.cart.items);
  return cart.reduce((total, item) => total + item.quantity, 0);
};

const CartItem = ({ onContinueShopping = () => {} }) => {
  const cart = useSelector((state) => state.cart.items) || [];
  const dispatch = useDispatch();

  const parseCost = (cost) => {
    if (!cost) {
      return 0;
    }
    const numericCost = parseFloat(cost.replace("$", ""));
    return isNaN(numericCost) ? 0 : numericCost;
  };

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0)
      .toFixed(2);
  };

  const totalAmount = useMemo(() => calculateTotalAmount(), [cart]);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (parseCost(item.cost) * item.quantity).toFixed(2);
  };

  const handleCheckOutShopping = () => {
    alert("Order confirmed ");
    cart.forEach((item) => {
      dispatch(removeItem(item.name));
    });
  };

  return (
    <VintagePlantBackground>
      <div className=" px-4 md:px-12 lg:px-24 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col  gap-4 bg-beige rounded-lg p-4 mb-2">
          <h1 className="text-xl font-bold text-quinary flex gap-3">
            Your Cart details <ShoppingBasketIcon />{" "}
          </h1>
          <h2 className="py-2 font-semibold text-quinary">
            Total Cart Amount:{" "}
            <span className="font-normal"> ${totalAmount}</span>
          </h2>
          <div className="flex gap-3 flex-col">
            {cart.map((item) => (
              <div className="flex border border-tertiary justify-between rounded-lg px-2 py-1 text-browny">
                <h4>{item.name}</h4>
                <span className="text-sm">
                  Total: ${calculateTotalCost(item)}
                </span>{" "}
              </div>
            ))}
          </div>
          <button
            className="bg-browny border-browny relative flex gap-1 items-center hover:scale-105 hover:bg-ccoki hover:border-ccoki font-bold text-white py-2 px-4 rounded-md w-fit mx-auto my-4"
            onClick={handleCheckOutShopping}
          >
            Checkout{" "}
          </button>
          <img
            src={require("../assets/cartplant.jpg")}
            className="rounded-lg"
            alt="plants"
          />
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-8 mb-8 w-full col-start-2 col-end-4">
          {cart.length > 0 ? (
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cart.map((item) => (
                <div
                  className="grid grid-cols-2 border border-quaternary rounded-lg hover:scale-105 transition-all duration-200"
                  key={item.name}
                >
                  <img
                    className="w-full h-48 rounded-lg"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex flex-row items-center ml-8 justify-between">
                    <div className="">
                      <h2 className="font-semibold text-xl text-browny py-2 w-full">
                        {item.name}
                      </h2>
                      <div className="flex items-center">
                        <button
                          aria-label="Decrease quantity"
                          className="text-tertiary hover:text-quaternary"
                          onClick={() => handleDecrement(item)}
                        >
                          <SquareMinus />
                        </button>

                        <span className="font-semibold text-quaternary px-4 text-2xl">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          className="text-tertiary hover:text-quaternary"
                          onClick={() => handleIncrement(item)}
                        >
                          <SquarePlus></SquarePlus>
                        </button>
                      </div>
                      <div className="flex flex-col mt-3 justify-between  gap-2">
                        <span className="text-sm">Price: {item.cost}</span>
                        <span className="text-sm">
                          Total: ${calculateTotalCost(item)}
                        </span>{" "}
                      </div>{" "}
                    </div>
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      className="text-red-500 hover:text-red-700 mr-4"
                      onClick={() => handleRemove(item)}
                    >
                      <BadgeX />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
          <button
            className="bg-tertiary text-white py-2 px-4 rounded-full hover:scale-105 flex gap-1 items-center"
            onClick={handleContinueShopping}
          >
            Continue Shopping <ArrowRight />
          </button>
        </div>
      </div>
    </VintagePlantBackground>
  );
};

export default CartItem;
