import React, { useState, useCallback, useContext } from "react";
import { Menu, X, ChevronDown, User, ShoppingBag, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Tooltip from "./UI/Tooltip";
import { useCartItemsCount } from "../redux/CartItem";

const MENU_ITEMS = ["Home", "About", "Contact", "Blog", "Community"];
const PLANT_SUBMENU = [
  { name: "Plant Encyclopedia", path: "/plant-encyclopedia" },
  { name: "Products", path: "/products" },
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  const cartItemsCount = useCartItemsCount();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(() => setIsDropdownOpen((prev) => !prev), []);
  const toggleUserDropdown = useCallback(() => setIsUserDropdownOpen((prev) => !prev), []);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const homenavigate = () => {
    navigate("/");
  };

  const renderMenuItem = (item) => (
    <li key={item} className="w-full md:w-auto">
      <a
        className="block py-2 px-4 md:px-2 text-amber-100 hover:text-amber-200 transition-colors duration-300 relative group"
        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
        onClick={() => setIsMenuOpen(false)}
      >
        {item}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
      </a>
    </li>
  );

  return (
    <nav className="z-50 block w-full px-4 py-5 shadow-md bg-quinary md:px-12 lg:px-24">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-2">
          <Leaf className="w-8 h-8 text-amber-200" />
          <button
            className="font-serif text-2xl font-bold text-amber-100"
            onClick={homenavigate}
          >
            LEAF BLOOM
          </button>
        </div>
        <div className="hidden md:block">
          <ul className="flex items-center space-x-4">
            {MENU_ITEMS.map(renderMenuItem)}
            <li className="relative group">
              <button
                className="flex items-center text-amber-100 hover:text-amber-200 transition-colors duration-300"
                onClick={toggleDropdown}
              >
                Plants
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              {isDropdownOpen && (
                <ul className="absolute py-2 right-0 top-8 mt-2 w-48 bg-amber-50 rounded-md shadow-lg z-50">
                  {PLANT_SUBMENU.map(({ name, path }) => (
                    <li key={name}>
                      <a
                        href={path}
                        className="block px-4 py-2 rounded-md text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
        <div className="hidden md:flex relative items-center space-x-7">
          <Tooltip content="Account">
            <User
              className="h-6 w-6 text-amber-100 hover:text-amber-200 cursor-pointer transition-colors duration-300"
              onClick={toggleUserDropdown}
            />
          </Tooltip>
          {isUserDropdownOpen && (
            <div className="absolute right-9 mt-2 w-36 py-2 bg-amber-50 rounded-md shadow-lg top-8 z-50">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setIsUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/signin");
                      setIsUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      navigate("/signup");
                      setIsUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}
          <Tooltip content="Cart">
            <button
              onClick={() => navigate("/cart")}
              aria-label="View Cart"
              className="relative text-amber-100 hover:text-amber-200 transition-colors duration-300"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-400 text-red-100 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </Tooltip>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-amber-100 hover:text-amber-200 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-quinary mt-4 rounded-lg shadow-lg">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            {MENU_ITEMS.map(renderMenuItem)}
            <li className="relative">
              <button
                className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-200 transition-colors duration-300 flex items-center justify-between"
                onClick={toggleDropdown}
              >
                Plants
                <ChevronDown className="h-4 w-4 transition-transform duration-300" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {isDropdownOpen && (
                <ul className="bg-green-800 rounded-md mt-1 py-1">
                  {PLANT_SUBMENU.map(({ name, path }) => (
                    <li key={name}>
                      <a
                        href={path}
                        className="block w-full text-left text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
          <div className="px-2 pt-2 pb-3 border-t border-green-700">
            <button
              onClick={() => {
                navigate("/cart");
                setIsMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-amber-100 hover:text-amber-200 transition-colors duration-300"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
            </button>
            {user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-200 transition-colors duration-300"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-200 transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/signin");
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-200 transition-colors duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-amber-100 hover:text-amber-200 transition-colors duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navigation;