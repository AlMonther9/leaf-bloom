import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { VintagePlantBackground } from "./UI/ThemedPlantBg";

// Lazy load the ThreeDModel to optimize performance
const ThreeDModel = lazy(() => import("./ThreeDModel"));

const transitionProps = {
  initial: { opacity: 0, translateY: "30%" },
  whileInView: { opacity: 1, translateY: "0" },
  viewport: { once: true, amount: 0.8 },
  transition: { duration: 0.5 },
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <VintagePlantBackground>
      <div className="relative overflow-x-hidden font-sans">
        {/* 3D Model Background */}
          <div className="flex flex-col items-center lg:flex-row md:flex-row">
            <div className="relative w-full h-auto lg:h-screen md:h-screen lg:w-2/5 md:w-2/5 hidden md:block lg:block">
              {/* Lazy loaded 3D model */}
              <Suspense fallback={<div>Loading 3D Model...</div>}>
                <ThreeDModel />
              </Suspense>
            </div>
          {/* Text and UI content */}
          <div className="relative flex max-h-screen pt-16 lg:min-h-screen lg:items-center lg:justify-end">
            <motion.div
              className="max-w-4xl p-6 lg:pr-24 lg:ml-0 lg:mt-0"
              initial={{ opacity: 0, translateY: "100%" }}
              whileInView={{ opacity: 1, translateY: "0" }}
            >
              <motion.h1 className="mb-6 font-bold text-left text-green-800 text-4xl ">
                Welcome to LEAF & BLOOM
              </motion.h1>
              <p className="mb-8 text-lg text-right text-green-700 lg:text-xl lg:text-left">
              At Leaf & Bloom, we believe that every home deserves a touch of
                nature. Whether you're a seasoned plant enthusiast or just
                beginning your green journey, we're here to help you cultivate a
                space that thrives. Let's grow together.
              </p>
              <motion.div
                className="space-x-4 text-right lg:text-left"
                initial={{ opacity: 0, translateX: "100%" }}
                whileInView={{ opacity: 1, translateX: "0" }}
              >
                <Link
                  to="/signup"
                  className="flex items-center px-4 py-2 font-bold text-white rounded-lg bg-tertiary hover:scale-105 hover:bg-quaternary w-fit"
                >
                  Get started <ChevronRight />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Shop Section */}
        <motion.div
          className="relative flex flex-col justify-between gap-4 px-4 pb-8 mx-auto mt-4 overflow-hidden shadow-lg md:gap-8 lg:gap-16 md:flex-row md:px-12 lg:px-24 lg:py-16 bg-gradient-to-br from-quinary to-green-100 opacity-45"
          {...transitionProps}
        >
          <motion.img
            className="w-11/12 pt-2 shadow-md md:w-1/2 lg:w-5/12 rounded-2xl hover:shadow-xl"
            alt="Decorate Your home with customized plants"
            src={require("../assets/kam-idris-_HqHX3LBN18-unsplash.jpg")}
            initial={{ opacity: 0, translateY: "40%" }}
            whileInView={{ opacity: 1, translateY: "0" }}
          />
          <motion.div className="flex flex-col w-11/12 gap-4 px-6 mx-auto my-auto md:px-0 md:w-1/2" {...transitionProps}>
            <h2 className="relative text-2xl font-bold text-green-950">
              Decorate Your home with customized plants
              <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-green-900 rounded-full"></span>
            </h2>
            <p className="text-lg text-green-800">
            Choose from a wide variety of unique plants tailored to your
              personal style and space. Our extensive collection includes
              everything from low-maintenance succulents to vibrant tropical
              plants. Whether you're looking to add a touch of greenery to your
              office desk or create a lush oasis in your backyard, we have the
              perfect plant for you. Explore our diverse range of plants, each
              carefully selected to bring beauty, freshness, and serenity to
              your environment. </p>
            <motion.button
              className="flex items-center justify-center w-3/12 px-4 py-2 text-white transition-all duration-300 rounded-lg shadow-md lg:w-2/12 bg-quaternary hover:bg-quinary hover:shadow-lg hover:scale-105"
              onClick={() => navigate("/products")}
              initial={{ opacity: 0, translateX: "80%" }}
              whileInView={{ opacity: 1, translateX: "0" }}
            >
              Shop <ChevronRight className="w-6 h-6 ml-1" />
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex flex-col gap-4 py-4 transition-colors duration-200 md:py-8 lg:py-12"
          initial={{ opacity: 0, translateY: "40%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <h2 className="flex justify-center mb-32 text-xl font-bold md:text-2xl text-green-950">
            Share with community
          </h2>
          <div className="flex gap-4 md:gap-8 px-4 md-px-8 lg:px-24 bg-secondary py-20 relative max-h-[500px]">
            <div className="relative w-1/3 -mt-28 group">
              <motion.img
                alt="Aromatic Fragrant Plants"
                className="w-full h-full rounded-lg b"
                initial={{ opacity: 0, translateY: "20%" }}
                whileInView={{ opacity: 1, translateY: "0" }}
                src={require("../assets/frag.jpg")}
              />
              <h3 className="absolute bottom-0 right-0 px-4 py-2 m-2 text-white transition-opacity bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100">
                Aromatic Fragrant Plants
              </h3>
            </div>
            <div className="relative w-1/3 -mt-4 group -mb-11">
              <motion.img
                alt="Insect Repellent Plants"
                className="w-full h-full rounded-lg b"
                initial={{ opacity: 0, translateY: "20%" }}
                whileInView={{ opacity: 1, translateY: "0" }}
                src={require("../assets/insect_repeal.jpg")}
              />
              <h3 className="absolute bottom-0 right-0 px-4 py-2 m-2 text-white transition-opacity bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100">
                Insect Repellent Plants
              </h3>
            </div>

            <div className="relative w-1/3 -mt-28 group">
              <motion.img
                alt=""
                className="w-full h-full rounded-lg b"
                initial={{ opacity: 0, translateY: "30%" }}
                whileInView={{ opacity: 1, translateY: "0" }}
                src={require("../assets/air.jpg")}
              />
              <h3 className="absolute bottom-0 right-0 px-4 py-2 m-2 text-white transition-opacity bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100">
                Air Purifying Plants
              </h3>
            </div>
            <motion.button
              onClick={() => navigate("/community")}
              className="absolute flex items-center px-8 py-2 text-white transition-colors transition-opacity duration-100 rounded-lg -bottom-5 left-1/2 bg-quaternary hover:bg-emerald-800"
              initial={{ opacity: 0, translateX: "80%" }}
              whileInView={{ opacity: 1, translateX: "0" }}
            >
              Explore <ChevronRight className="w-4 h-4 ml-2 " />
            </motion.button>
          </div>
        </motion.div>

        {/* New plant encyclopedia section */}
        <motion.div
          className="flex flex-col gap-4 px-4 py-4 transition-colors duration-200 md:py-8 lg:py-12 md:my-16 md:px-12 lg:px-24"
          initial={{ opacity: 0, translateY: "30%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <h2 className="flex justify-center text-xl font-bold text-green-950 md:text-2xl">
            Explore Our Plant Encyclopedia
          </h2>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
            <Leaf className="relative mt-auto ml-auto rotate-180 text-tertiary w-96 h-96" />
            <motion.p
              initial={{ opacity: 0, translateX: "80%" }}
              whileInView={{ opacity: 1, translateX: "0" }}
              className="w-11/12 md:w-5/12 border-2 border-pinky text-green-800 rounded-lg p-6 text-xl absolute z-10 shadow-[-5px_-5px_15px_2px_rgba(0,0,0,0.05),_5px_5px_10px_2px_rgba(45,48,2)]"
            >
              Discover a world of plants at your fingertips. Our comprehensive Plant Encyclopedia
              offers detailed information on various species, including care instructions,
              scientific names, and growing conditions. Use our advanced search and filter
              options to find the perfect plant for your space.
              <motion.button
                  className="flex items-center justify-center mt-4 w- px-4 py-2 text-white transition-all duration-300 rounded-lg shadow-md bg-quaternary hover:bg-quinary hover:shadow-lg hover:scale-105"
                  onClick={() => navigate("/plantencyclopedia")}
                  initial={{ opacity: 0, translateX: "80%" }}
                  whileInView={{ opacity: 1, translateX: "0" }}
              >
                  Browse Encyclopedia <ChevronRight className="w-5 h-5 ml-2" />
              </motion.button>
            </motion.p>
            <div className="relative flex justify-end w-11/12 group md:w-1/3">
              <motion.img
                alt="How to Care for Succulents"
                className="w-full h-full rounded-lg"
                initial={{ opacity: 0, translatey: "30%" }}
                whileInView={{ opacity: 1, translatey: "0" }}
                src={require("../assets/lavender-plant.jpeg")}
              />
              <h3 className="absolute bottom-0 right-0 px-4 py-2 m-2 text-white transition-opacity bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100">
                How to Care for Succulents
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Plants Care Section Blog */}
        <motion.div
          className="flex flex-col gap-4 py-4 transition-colors duration-200 md:py-8 lg:py-12"
          initial={{ opacity: 0, translateY: "20%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <h2 className="flex justify-center text-xl font-bold text-green-950 md:text-2xl">
            Plants Care Blog
          </h2>

          <div className="flex flex-col items-center px-4 md:flex-row md:gap-4 md:px-12 lg:px-24">
            <div className="relative w-full h-64 overflow-hidden group md:w-1/2 md:h-96">
              <motion.img
                alt="Caring for Indoor Plants"
                className="object-cover w-full h-full rounded-lg"
                src={require("../assets/R.jpeg")}
              />
              <h3 className="absolute bottom-0 right-0 px-4 py-2 m-2 text-white transition-opacity bg-black bg-opacity-50 rounded opacity-0 group-hover:opacity-100">
                Caring for Indoor Plants
              </h3>
            </div>
            <div className="w-full mt-4 md:w-1/2 md:mt-0">
              <h3 className="mb-4 text-xl font-bold text-green-950">
                Caring for Your Plants
              </h3>
              <p className="mb-2 text-lg">
                Caring for your plants is crucial for their growth and
                well-being. It's not just about watering them, but also about
                providing the right environment, nutrients, and attention.
                Proper care can make all the difference in keeping your plants
                healthy and thriving.
              </p>
              <p className="text-lg">
                Want to learn more about how to care for your plants? Visit our
                <Link
                  to="/blog"
                  className="ml-1 text-green-800 hover:text-green-900"
                >
                  Care for Plants
                </Link>
                page for expert tips and guides.
              </p>
            </div>
          </div>
        </motion.div>
        <div className="flex-col items-start justify-center hidden gap-2 px-12 text-darkpink md:flex bg-shopping h-96 md:my-16 lg:px-24 ">
          <h2 className="text-2xl font-bold ">Free Shipping Service</h2>
          <p className="text-xl">Free Shipping in Cairo and Giza</p>
          <div className="flex items-center gap-2 text-darkpink">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ fill: "#9C6955", transform: "", msFilter: "" }}
            >
              <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
            </svg>
            leafbloom2@gmail.com
          </div>
        </div>
      </div>
    </VintagePlantBackground>
  );
};

export default LandingPage;
