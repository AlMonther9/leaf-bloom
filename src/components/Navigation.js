import { useState, useCallback } from "react";
import { Menu, X, ChevronDown, User, ShoppingBag, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
/* import { useCartItemsCount } from "../redux/CartItem"; */
const MENU_ITEMS = ["Home", "About", "Contact", "Blog", "Community"];
const PLANT_SUBMENU = [
  { name: "Plant Encyclopedia", path: "/plant-encyclopedia" },
  { name: "Products", path: "/products" },
];

// Custom Tooltip component
const Tooltip = ({ children, content }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute z-10 invisible group-hover:visible bg-amber-50 text-green-800 text-sm w-32 rounded-lg py-1 px-3 left-1/2= transform -translate-x-1/2 mb-1 shadow-lg border border-green-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {content}
        <svg
          className="absolute text-amber-50 h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  );
};

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const toggleDropdown = useCallback(
    () => setIsDropdownOpen((prev) => !prev),
    []
  );
  const toggleUserDropdown = useCallback(
    () => setIsUserDropdownOpen((prev) => !prev),
    []
  );
  const homenavigate = () => {
    navigate("/");
  };
  const renderMenuItem = (item) => (
    <li key={item} className="flex items-center">
      <a
        className="block no-underline hover:text-amber-200 transition-colors duration-300 relative group"
        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
      >
        {item}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
      </a>
    </li>
  );
  /*   const cartItemsCount = useCartItemsCount(); */

  return (
    <nav className="bg-quinary p-6 block w-full z-50 shadow-md px-4 md:px-12 lg:px-24">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="text-amber-200 w-8 h-8" />
          <button
            className="text-amber-100 text-2xl font-bold font-serif"
            onClick={homenavigate}
          >
            LEAF BLOOM
          </button>
        </div>
        <button
          className="md:hidden text-amber-100 hover:text-amber-200 transition-colors duration-300"
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
              className="flex items-center no-underline hover:text-amber-200 transition-colors duration-300 group"
              onClick={toggleDropdown}
            >
              Plants{" "}
              <ChevronDown className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-8 right-0 mt-2 w-48 bg-amber-50 rounded-md shadow-lg py-2 z-10">
                {PLANT_SUBMENU.map(({ name, path }) => (
                  <li key={name}>
                    <a
                      href={path}
                      className="block px-4 py-2 text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300"
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
                className="w-6 h-6 cursor-pointer text-amber-100 hover:text-amber-200 transition-colors duration-300"
                onClick={toggleUserDropdown}
              />
            </Tooltip>
            {isUserDropdownOpen && (
              <div className="absolute top-8 right-0 mt-2 w-36 bg-amber-50 rounded-md shadow-lg py-2 z-10">
                {["Sign In", "Sign Up"].map((action) => (
                  <button
                    key={action}
                    onClick={() =>
                      navigate(`/${action.toLowerCase().replace(" ", "")}`)
                    }
                    className="block w-full px-4 py-2 text-sm text-green-800 hover:bg-amber-100 hover:text-green-900 transition-colors duration-300 text-left"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <Tooltip content="Cart">
              <button
                onClick={() => navigate("/cart")}
                aria-label="View Cart"
                className="text-amber-100 hover:text-amber-200 transition-colors duration-300"
              >
                <ShoppingBag className="w-6 h-6" />
                {/* {cartItemsCount > 0 && (
                  <span className="absolute top-4 -right-2 inline-flex items-center justify-center py-1 px-1 text-xs leading-none text-red-100 bg-red-400 hover:bg-red-600 hover:scale-105 rounded-full">
                    {cartItemsCount}
                  </span>
                )} */}
              </button>
            </Tooltip>
          </div>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
