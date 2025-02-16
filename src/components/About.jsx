import React from "react";
import { Leaf, Flower, Sun, Wind } from "lucide-react";
import { VintagePlantBackground } from "./UI/ThemedPlantBg";

function About() {
  return (
    <VintagePlantBackground>
      <div className="min-h-screen">
        <div className="container p-4 pt-12 mx-auto md:p-8 lg:p-16 xl:p-24">
          <h1 className="mb-8 font-serif text-4xl font-bold text-center text-green-800 md:text-5xl">
            About Leaf & Bloom
          </h1>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="mb-6 text-xl italic text-center text-green-700">
              "Where green dreams blossom into reality"
            </p>
            <div className="p-6 border-2 border-green-200 rounded-lg shadow-md bg-gradient-to-r from-orange-100 to-amber-50">
              <p className="mb-4 text-lg leading-relaxed text-green-800">
                Welcome to Leaf & Bloom, a verdant haven where nature's wonders
                flourish. Our passion lies in cultivating connections between
                people and plants, nurturing not just greenery, but a lifestyle
                rooted in natural harmony.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 my-8 md:gap-8">
                <div className="text-center">
                  <Leaf className="w-12 h-12 mx-auto mb-2 text-green-600" />
                  <span className="text-sm text-green-700">Sustainable</span>
                </div>
                <div className="text-center">
                  <Flower className="w-12 h-12 mx-auto mb-2 text-pink-500" />
                  <span className="text-sm text-green-700">Beautiful</span>
                </div>
                <div className="text-center">
                  <Sun className="w-12 h-12 mx-auto mb-2 text-amber-500" />
                  <span className="text-sm text-green-700">Life-giving</span>
                </div>
                <div className="text-center">
                  <Wind className="w-12 h-12 mx-auto mb-2 text-blue-400" />
                  <span className="text-sm text-green-700">Purifying</span>
                </div>
              </div>
              <p className="mb-4 text-lg leading-relaxed text-green-800">
                From air-purifying marvels to aromatic wonders, our curated
                collection caters to every plant enthusiast's dream. Each leaf
                and petal in our nursery is a testament to our commitment to
                quality and care.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-900 rounded-lg opacity-60"></div>
              <div className="relative p-6 bg-green-800 rounded-lg text-amber-100">
                <h2 className="mb-4 font-serif text-2xl">
                  Our Green Philosophy
                </h2>
                <p className="mb-4">At Leaf & Bloom, we believe in:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Nurturing a greener, healthier world</li>
                  <li>Educating and inspiring plant enthusiasts</li>
                  <li>Promoting sustainable and eco-friendly practices</li>
                  <li>Bringing the serenity of nature into every space</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <p className="mb-6 text-lg italic text-green-800">
                "In every leaf and bloom, there's a story waiting to unfold in
                your home."
              </p>
              <a href="/Products">
                <button className="px-4 py-2 font-bold transition duration-300 ease-in-out transform bg-green-700 rounded-full hover:bg-green-800 text-amber-100 hover:scale-105">
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
