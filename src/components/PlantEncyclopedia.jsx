import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./SearchBar";
import FilterComponent from "./FilterComponent";
import PlantList from "./PlantList";
import { getPlants, searchPlants } from "../api/api";

const PlantEncyclopedia = () => {
  const [plants, setPlants] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlants = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPlants(page, filters);
      setPlants(response.data);
      setTotalPages(response.last_page);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching plants:", error);
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await searchPlants(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error searching plants:", error);
      setSearchResults(null);
    }
    setLoading(false);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setSearchResults(null);
  };

  return (
    <div className="px-8 md:px-12 lg:px-24 pt-6 bg-sunflower bg-cover">
      <div className="flex flex-col gap-6 pb-8">
        <div className="w-full">
          {loading ? (
            <p className="text-center mt-4 text-[#3A5A40]">Loading...</p>
          ) : searchResults ? (
            <div>
              <h3 className="text-xl font-semibold text-[#3A5A40] mt-6 mb-4">
                Search Results
              </h3>
              <PlantList
                plants={searchResults.data}
                page={page}
                setPage={setPage}
                totalPages={searchResults.last_page}
                isSearchResult={true}
              />
            </div>
          ) : (
            <div>
              <div className="flex flex-col md:flex-row gap-3  justify-evenly items-center mb-4 md:mb-8">
                <h1 className="text-4xl font-semibold text-green-800">
                  Featured Plants
                </h1>{" "}
                <SearchBar onSearch={handleSearch} />{" "}
              </div>
              <div className="w-full">
                <FilterComponent onApplyFilters={handleApplyFilters} />
              </div>
              <PlantList
                plants={plants}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                isSearchResult={false}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantEncyclopedia;
