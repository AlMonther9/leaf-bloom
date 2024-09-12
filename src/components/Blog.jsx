import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { getPlants, getCareGuides, getPestDiseaseList, getFAQs } from '../api/api';

const renderContent = (content) => {
  if (typeof content === 'string') {
    return content;
  } else if (typeof content === 'object' && content !== null) {
    return JSON.stringify(content);
  }
  return '';
};

const Blog = () => {
  const [plants, setPlants] = useState([]);
  const [careGuides, setCareGuides] = useState([]);
  const [pestDiseases, setPestDiseases] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [plantsResponse, pestDiseasesResponse, faqsResponse] = await Promise.all([
        getPlants(page),
        getPestDiseaseList(),
        getFAQs()
      ]);

      setPlants(plantsResponse.data);
      setTotalPages(plantsResponse.last_page);
      setPestDiseases(pestDiseasesResponse.data);
      setFaqs(faqsResponse.data);

      if (plantsResponse.data.length > 0) {
        const guidesResponse = await getCareGuides(plantsResponse.data[0].id);
        setCareGuides(guidesResponse.data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Plant Care Blog</h1>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search plants..."
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" />
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Plants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div key={plant.id} className="bg-[#A3B18A] rounded-lg shadow-md overflow-hidden">
              {plant.default_image && (
                <img
                  src={plant.default_image.thumbnail}
                  alt={plant.common_name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#344E41] mb-2">{plant.common_name}</h3>
                <p className="text-sm text-[#3A5A40] mb-1">Scientific Name: {Array.isArray(plant.scientific_name) ? plant.scientific_name.join(', ') : plant.scientific_name}</p>
                <p className="text-sm text-[#3A5A40] mb-1">Cycle: {plant.cycle}</p>
                <p className="text-sm text-[#3A5A40] mb-1">Watering: {plant.watering}</p>
                <p className="text-sm text-[#3A5A40]">Sunlight: {Array.isArray(plant.sunlight) ? plant.sunlight.join(', ') : plant.sunlight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Care Guides</h2>
        <div className="space-y-4">
          {careGuides.map((guide) => (
            <div key={guide.id} className="bg-[#A3B18A] rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-2">{guide.section}</h3>
              <p className="text-sm text-[#3A5A40]">{renderContent(guide.description)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Pests and Diseases</h2>
        <div className="space-y-4">
          {pestDiseases.map((item) => (
            <div key={item.id} className="bg-[#A3B18A] rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-2">{item.common_name}</h3>
              <p className="text-sm text-[#3A5A40]">{renderContent(item.description)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-[#A3B18A] rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-[#344E41] mb-2">{renderContent(faq.question)}</h3>
              <p className="text-sm text-[#3A5A40]">{renderContent(faq.answer)}</p>
            </div>
          ))}
        </div>
      </section>

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
    </div>
  );
};

export default Blog;