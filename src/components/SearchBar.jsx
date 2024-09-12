import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search plants..."
          className="flex-grow px-4 py-2 rounded-l-md border-2 border-[#588157] focus:outline-none focus:border-[#3A5A40]"
        />
        <button
          type="submit"
          className="bg-[#588157] text-white px-4 py-2 rounded-r-md hover:bg-[#3A5A40] transition duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;