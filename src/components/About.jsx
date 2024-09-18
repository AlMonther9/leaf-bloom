import React from 'react';
import { Leaf, Flower, Sun, Wind } from 'lucide-react';
import { VintagePlantBackground } from './UI/ThemedPlantBg';

function About() {
  return (
    <VintagePlantBackground>
    <div className=" min-h-screen">
      <div className="container mx-auto p-6 pt-12 md:p-12 lg:p-24 xl:p-32">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-green-800 text-center">About Leaf & Bloom</h1>
        <div className="max-w-4xl mx-auto space-y-8">
          <p className="text-xl text-green-700 mb-6 text-center italic">
            "Where green dreams blossom into reality"
          </p>
          <div className="bg-gradient-to-r from-orange-100 to-amber-50 rounded-lg shadow-md p-6 border-2 border-green-200">
            <p className="text-lg text-green-800 mb-4 leading-relaxed">
              Welcome to Leaf & Bloom, a verdant haven where nature's wonders flourish. Our passion lies in cultivating connections between people and plants, nurturing not just greenery, but a lifestyle rooted in natural harmony.
            </p>
            <div className="flex justify-center items-center space-x-8 my-8">
              <div className="text-center">
                <Leaf className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <span className="text-sm text-green-700">Sustainable</span>
              </div>
              <div className="text-center">
                <Flower className="w-12 h-12 text-pink-500 mx-auto mb-2" />
                <span className="text-sm text-green-700">Beautiful</span>
              </div>
              <div className="text-center">
                <Sun className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                <span className="text-sm text-green-700">Life-giving</span>
              </div>
              <div className="text-center">
                <Wind className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <span className="text-sm text-green-700">Purifying</span>
              </div>
            </div>
            <p className="text-lg text-green-800 mb-4 leading-relaxed">
              From air-purifying marvels to aromatic wonders, our curated collection caters to every plant enthusiast's dream. Each leaf and petal in our nursery is a testament to our commitment to quality and care.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-green-900 opacity-60 rounded-lg"></div>
            <div className="relative bg-green-800 text-amber-100 p-6 rounded-lg">
              <h2 className="text-2xl font-serif mb-4">Our Green Philosophy</h2>
              <p className="mb-4">
                At Leaf & Bloom, we believe in:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Nurturing a greener, healthier world</li>
                <li>Educating and inspiring plant enthusiasts</li>
                <li>Promoting sustainable and eco-friendly practices</li>
                <li>Bringing the serenity of nature into every space</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg text-green-800 mb-6 italic">
              "In every leaf and bloom, there's a story waiting to unfold in your home."
            </p>
            <a href='/Products'>
            <button className="bg-green-700 hover:bg-green-800 text-amber-100 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
              Explore Our Collection
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    </VintagePlantBackground>
  );
}

export default About;