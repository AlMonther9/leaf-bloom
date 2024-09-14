import React, { useState } from "react";

const PlantList = ({ plants, page, setPage, totalPages }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="-mx-24 px-24 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className="bg-opacity-50 backdrop-blur-xl rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => openImage(plant.default_image?.regular_url)}
          >
            {plant.default_image && (
              <img
                src={plant.default_image.thumbnail}
                alt={plant.common_name}
                className="w-full object-cover"
              />
            )}
            <div className="p-4 text-green-950">
              <h3 className="text-lg font-semibold mb-2">
                {plant.common_name}
              </h3>
              <p className="text-sm  mb-1">
                <span className="font-semibold mr-1">Scientific Name:</span>{" "}
                {plant.scientific_name.join(", ")}
              </p>
              <p className="text-sm  mb-1">
                <span className="font-semibold mr-1">Cycle:</span> {plant.cycle}
              </p>
              <p className="text-sm  mb-1">
                <span className="font-semibold mr-1">Watering:</span>{" "}
                {plant.watering}
              </p>
              <p className="text-sm ">
                <span className="font-semibold mr-1">Sunlight:</span>{" "}
                {Array.isArray(plant.sunlight)
                  ? plant.sunlight.join(", ")
                  : plant.sunlight}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-[#588157] text-white px-4 py-2 rounded-l-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="bg-[#588157] text-white px-4 py-2">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-[#588157] text-white px-4 py-2 rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div className="max-w-3xl max-h-[90vh] overflow-auto">
            <img
              src={selectedImage}
              alt="Full size plant"
              className="max-w-full max-h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantList;
