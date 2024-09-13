import React, { useState } from "react";
import { Filter } from "lucide-react";
import SearchBar from "./SearchBar";
const FilterComponent = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    edible: "",
    poisonous: "",
    cycle: "",
    watering: "",
    sunlight: "",
    indoor: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const renderSelect = (name, options) => (
    <div className="flex-1 px-2">
      <select
        name={name}
        onChange={handleChange}
        className="w-full p-2 rounded-lg bg-white border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">{name.charAt(0).toUpperCase() + name.slice(1)}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-opacity-90 backdrop-blur-xl rounded-lg shadow-md py-4"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-0 lg:grid-cols-6 w-full">
        {renderSelect("edible", [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ])}
        {renderSelect("poisonous", [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ])}
        {renderSelect("cycle", [
          { value: "perennial", label: "Perennial" },
          { value: "annual", label: "Annual" },
          { value: "biennial", label: "Biennial" },
          { value: "biannual", label: "Biannual" },
        ])}
        {renderSelect("watering", [
          { value: "frequent", label: "Frequent" },
          { value: "average", label: "Average" },
          { value: "minimum", label: "Minimum" },
          { value: "none", label: "None" },
        ])}
        {renderSelect("sunlight", [
          { value: "full_shade", label: "Full Shade" },
          { value: "part_shade", label: "Part Shade" },
          { value: "full_sun", label: "Full Sun" },
        ])}
        {renderSelect("indoor", [
          { value: "1", label: "Yes" },
          { value: "0", label: "No" },
        ])}
      </div>{" "}
      <button
        type="submit"
        className="text-green-950 hover:text-quaternary hover:scale-105 pr-2"
      >
        {" "}
        <Filter />{" "}
      </button>
    </form>
  );
};

export default FilterComponent;
