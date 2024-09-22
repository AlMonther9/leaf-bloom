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
      <div className="grid grid-cols-1 gap-4 px-4 pt-16  md:px-12 lg:px-24 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4 p-4 mb-2 rounded-lg bg-beige">
          <h1 className="flex gap-3 text-xl font-bold text-quinary">
            Your Cart details <ShoppingBasketIcon />{" "}
          </h1>
          <h2 className="py-2 font-semibold text-quinary">
            Total Cart Amount:{" "}
            <span className="font-normal"> ${totalAmount}</span>
          </h2>
          <div className="flex flex-col gap-3">
            {cart.map((item) => (
              <div className="flex justify-between px-2 py-1 border rounded-lg border-tertiary text-browny">
                <h4>{item.name}</h4>
                <span className="text-sm">
                  Total: ${calculateTotalCost(item)}
                </span>{" "}
              </div>
            ))}
          </div>
          <button
            className="relative flex items-center gap-1 px-4 py-2 mx-auto my-4 font-bold text-white rounded-md bg-browny border-browny hover:scale-105 hover:bg-ccoki hover:border-ccoki w-fit"
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

        <div className="flex flex-col items-center w-full col-start-2 col-end-4 gap-4 mb-8 md:gap-8">
          {cart.length > 0 ? (
            <div className="grid grid-cols-1 gap-6  lg:grid-cols-2">
              {cart.map((item) => (
                <div
                  className="grid grid-cols-2 transition-all duration-200 border rounded-lg border-quaternary hover:scale-105"
                  key={item.name}
                >
                  <img
                    className="w-full h-48 rounded-lg"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex flex-row items-center justify-between ml-8">
                    <div className="">
                      <h2 className="w-full py-2 text-xl font-semibold text-browny">
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

                        <span className="px-4 text-2xl font-semibold text-quaternary">
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
                      <div className="flex flex-col justify-between gap-2 mt-3">
                        <span className="text-sm">Price: {item.cost}</span>
                        <span className="text-sm">
                          Total: ${calculateTotalCost(item)}
                        </span>{" "}
                      </div>{" "}
                    </div>
                    <button
                      aria-label={`Remove ${item.name} from cart`}
                      className="mr-4 text-red-500 hover:text-red-700"
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
            className="flex items-center gap-1 px-4 py-2 text-white rounded-full bg-tertiary hover:scale-105"
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
