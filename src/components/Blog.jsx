import React, { useState, useEffect } from 'react';
import { getPestDiseaseList, getCareGuides, getFAQs } from '../api/api';
import { AlertCircle, Leaf } from 'lucide-react';
import Loading from './UI/Loader';
// Helper to safely render content
const renderContent = (content) => {
  if (typeof content === 'string') {
    return content;
  } else if (Array.isArray(content)) {
    return content.map((item) => renderContent(item)).join(', ');
  } else if (content && typeof content === 'object') {
    return content.description || JSON.stringify(content);
  }
  return '';
};

// Helper to render description sections
const renderDescription = (description) => {
  if (Array.isArray(description)) {
    return description.map((item, index) => (
      <p key={index} className="text-gray-700 mb-2">
        {item.subtitle && <strong>{item.subtitle}: </strong>}
        {renderContent(item.description)}
      </p>
    ));
  } else {
    return <p className="text-gray-700">{renderContent(description)}</p>;
  }
};

function Blog() {
  const [pestData, setPestData] = useState([]);
  const [careGuides, setCareGuides] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pestResponse, careResponse, faqResponse] = await Promise.all([
          getPestDiseaseList(),
          getCareGuides(),
          getFAQs(),
        ]);

        // Ensure the data is valid and not empty
        if (pestResponse?.data && careResponse?.data && faqResponse?.data) {
          setPestData(pestResponse.data.slice(0, 10));
          setCareGuides(careResponse.data.slice(0, 10));
          setFaqs(faqResponse.data.slice(0, 10));
        } else {
          throw new Error('Invalid response structure');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#F3E9D2]">
        <div
          className="bg-[#FFD9B7] border border-[#C9ADA7] text-[#6B4F4F] px-4 py-3 rounded-lg shadow-md"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3E9D2] min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-[#114232] font-serif">
          The Cozy Plant Corner
        </h1>

        {pestData.map((pest, index) => (
          <article
            key={pest.id || index} // Ensure a unique key
            className="mb-16 bg-[#FFE8D6] rounded-lg shadow-lg overflow-hidden border-2 border-[#C9ADA7]"
          >
            <div className="p-8">
              <h2 className="text-3xl font-semibold mb-6 text-[#114232] font-serif flex items-center">
                <Leaf className="mr-2" /> Plant Care Guide #{index + 1}
              </h2>

              {/* Pest/Disease Section */}
              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-[#557153]">
                  Pest/Disease: {renderContent(pest?.common_name)}
                </h3>
                <p className="text-[#6B4F4F] mb-4 italic">
                  Scientific Name: {renderContent(pest?.scientific_name)}
                </p>
                {pest?.description && (
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold mb-2 text-[#557153]">
                      Description
                    </h4>
                    {renderDescription(pest.description)}
                  </div>
                )}
                {pest?.images && pest.images.length > 0 && (
                  <img
                    src={pest.images[0].original_url}
                    alt={renderContent(pest.common_name)}
                    className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
                  />
                )}
              </section>

              {/* Care Guide Section */}
              {careGuides[index] && (
                <section className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#557153]">
                    Care Guide: {renderContent(careGuides[index]?.plant_name)}
                  </h3>
                  {careGuides[index]?.section && renderDescription(careGuides[index].section)}
                </section>
              )}

              {/* FAQ Section */}
              {faqs[index] && (
                <section className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#557153]">
                    FAQ
                  </h3>
                  <h4 className="text-xl font-semibold mb-2 text-[#6B4F4F]">
                    {renderContent(faqs[index]?.question)}
                  </h4>
                  <p className="text-[#6B4F4F]">
                    {renderContent(faqs[index]?.answer)}
                  </p>
                </section>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
