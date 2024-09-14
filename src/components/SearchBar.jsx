import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch = () => {} }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="relative w-full">
        <input
          value={query}
          className="w-full p-2 pr-10 border border-tertiary rounded-lg  outline-none focus:border-quaternary focus:border-2"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search plants..."
        />
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
          <Search size={20} className="text-tertiary" />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
