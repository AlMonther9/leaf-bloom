import React from "react";
import { Leaf, Instagram, Facebook, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-quinary text-amber-100 mt-auto px-4 md:px-12 lg:px-24">
      <div className=" mx-auto py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Leaf className="text-amber-200 w-10 h-10" />
            <div className="font-serif">
              <h1 className="text-amber-100 text-2xl font-bold">LEAF</h1>
              <h1 className="text-amber-200 text-2xl font-bold">BLOOM</h1>
            </div>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-amber-200 transition-colors duration-300"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-amber-200 transition-colors duration-300"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-amber-200 transition-colors duration-300"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-green-700 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <nav>
            <ul className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-6">
              {["Home", "About", "Contact", "Blog", "Community"].map((item) => (
                <li key={item}>
                  <a
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="hover:text-amber-200 transition-colors duration-300 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm text-amber-100">
            &copy; {new Date().getFullYear()} LEAF & BLOOM. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
