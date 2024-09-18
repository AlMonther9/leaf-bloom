import { useState, useCallback, useContext } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  ShoppingBag,
  Leaf,
  LogOut,
} from "lucide-react";
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

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    []
  );
  const toggleUserDropdown = useCallback(
    () => setIsUserDropdownOpen((prev) => !prev),
    []
  );

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
    <li key={item} className="flex items-center">
      <a
        className="relative block no-underline transition-colors duration-300 hover:text-amber-200 group"
        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
      </a>
    </li>
  );
  const cartItemsCount = useCartItemsCount();

  return (
    <nav className="z-50 block w-full px-4 py-6 shadow-md bg-quinary md:px-12 lg:px-24">
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
        <button
          className="transition-colors duration-300 md:hidden text-amber-100 hover:text-amber-200"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:relative left-0 right-0 top-20 md:top-auto bg-green-800 md:bg-transparent p-6 md:p-0 space-y-4 md:space-y-0 md:space-x-8 text-amber-100 items-center rounded-b-lg md:rounded-none shadow-lg md:shadow-none`}
        >
          {MENU_ITEMS.map(renderMenuItem)}
          <li className="relative">
            <button
              className="flex items-center no-underline transition-colors duration-300 hover:text-amber-200 group"
              onClick={toggleDropdown}
            >
              Plants{" "}
              <ChevronDown className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute right-0 z-50 w-48 py-2 mt-2 rounded-md shadow-lg top-8 bg-amber-50">
                {PLANT_SUBMENU.map(({ name, path }) => (
                  <li key={name}>
                    <a
                      href={path}
                      className="block px-4 py-2 text-sm text-green-800 transition-colors duration-300 hover:bg-amber-100 hover:text-green-900"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <div className="relative flex items-center">
            <Tooltip content="Account">
              <User
                className="w-6 h-6 transition-colors duration-300 cursor-pointer text-amber-100 hover:text-amber-200"
                onClick={toggleUserDropdown}
              />
            </Tooltip>
            {isUserDropdownOpen && (
              <div className="absolute right-0 z-10 py-2 mt-2 rounded-md shadow-lg top-8 w-36 bg-amber-50">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate("/profile")}
                      className="block w-full px-4 py-2 text-sm text-left text-green-800 transition-colors duration-300 hover:bg-amber-100 hover:text-green-900"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-green-800 transition-colors duration-300 hover:bg-amber-100 hover:text-green-900"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/signin")}
                      className="block w-full px-4 py-2 text-sm text-left text-green-800 transition-colors duration-300 hover:bg-amber-100 hover:text-green-900"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate("/signup")}
                      className="block w-full px-4 py-2 text-sm text-left text-green-800 transition-colors duration-300 hover:bg-amber-100 hover:text-green-900"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="relative">
            <Tooltip content="Cart">
              <button
                onClick={() => navigate("/cart")}
                aria-label="View Cart"
                className="transition-colors duration-300 text-amber-100 hover:text-amber-200"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute inline-flex items-center justify-center px-1 py-1 text-xs leading-none text-red-100 bg-red-400 rounded-full top-4 -right-2 hover:bg-red-600 hover:scale-105">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </Tooltip>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
