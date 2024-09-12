import React, { useState } from 'react';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.map(plant => (
          <div
            key={plant.id}
            className="bg-[#A3B18A] rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={() => openImage(plant.default_image?.regular_url)}
          >
            {plant.default_image && (
              <img src={plant.default_image.thumbnail} alt={plant.common_name} className="w-full h-48 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-2">{plant.common_name}</h3>
              <p className="text-sm text-[#3A5A40] mb-1">Scientific Name: {plant.scientific_name.join(', ')}</p>
              <p className="text-sm text-[#3A5A40] mb-1">Cycle: {plant.cycle}</p>
              <p className="text-sm text-[#3A5A40] mb-1">Watering: {plant.watering}</p>
              <p className="text-sm text-[#3A5A40]">Sunlight: {Array.isArray(plant.sunlight) ? plant.sunlight.join(', ') : plant.sunlight}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-[#588157] text-white px-4 py-2 rounded-l-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="bg-[#588157] text-white px-4 py-2">Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="bg-[#588157] text-white px-4 py-2 rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeImage}>
          <div className="max-w-3xl max-h-[90vh] overflow-auto">
            <img src={selectedImage} alt="Full size plant" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantList;