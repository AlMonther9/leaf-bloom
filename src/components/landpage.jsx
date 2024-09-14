import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Leaf } from "lucide-react";
import { motion, useScroll, useInView } from "framer-motion";
const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="font-sans bg-[#DAD7CD]">
      <div className="relative max-h-screen lg:min-h-screen bg-smallland lg:bg-land flex bg-cover pt-16 lg:items-center lg:justify-end">
        <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
        <motion.div
          className="max-w-4xl p-6 lg:mr-16 lg:ml-0 lg:mt-0"
          initial={{ opacity: 0, translateY: "100%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <motion.h1 className="text-2xl lg:text-4xl font-bold text-green-800 mb-6 text-right lg:text-left">
            <span className="">Welcome to</span> LEAF & BLOOM
          </motion.h1>
          <p className="text-lg lg:text-xl text-green-700 mb-8 text-right lg:text-left">
            At Leaf & Bloom, we believe that every home deserves a touch of
            nature. Whether you're a seasoned plant enthusiast or just beginning
            your green journey, we're here to help you cultivate a space that
            thrives. Let's grow together.
          </p>
          <motion.div
            className="space-x-4 text-right lg:text-left transition-opacity duration-100"
            initial={{ opacity: 0, translate: "100%" }}
            whileInView={{ opacity: 1, translate: "0" }}
          >
            <Link
              to="/signup"
              className="bg-tertiary flex items-center hover:scale-105 hover:bg-quaternary text-white font-bold w-fit py-2 px-4 rounded-lg"
              initial={{ opacity: 0, translate: "100%" }}
              whileInView={{ opacity: 1, translate: "0" }}
            >
              Get started <ChevronRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="flex flex-col gap-4 md:gap-8 lg:gap-16 md:flex-row mx-auto px-4 md:px-12 lg:px-24 justify-between mt-8 pb-8 md:mt-12 md:pb-12 lg:mt-16 lg:pb-16"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.img
          className="w-11/12 md:w-1/2 lg:w-5/12 rounded-xl transition-opacity"
          alt="Decorate Your home with customize plants"
          src={require("../assets/kam-idris-_HqHX3LBN18-unsplash.jpg")}
          initial={{ opacity: 0, translateY: "40%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        />
        <motion.div
          className="mx-auto my-auto flex flex-col gap-4 px-6 md:px-0 w:11/12 md:x-1/2"
          initial={{ opacity: 0, translateY: "40%" }}
          whileInView={{ opacity: 1, translateY: "0" }}
        >
          <h2 className="font-bold text-2xl text-green-950">
            Decorate Your home with customize plants
          </h2>
          <p className="">
            Choose from a wide variety of unique plants tailored to your
            personal style and space. Our extensive collection includes
            everything from low-maintenance succulents to vibrant tropical
            plants. Whether you're looking to add a touch of greenery to your
            office desk or create a lush oasis in your backyard, we have the
            perfect plant for you. Explore our diverse range of plants, each
            carefully selected to bring beauty, freshness, and serenity to your
            environment.
          </p>
          <motion.button
            className="flex items-center w-3/12 lg:w-2/12 justify-center rounded-lg transition-colors duration-300 bg-tertiary py-1 hover:bg-quaternary text-white scale-105"
            initial={{ opacity: 0, translate: "100%" }}
            whileInView={{ opacity: 1, translate: "0" }}
            onClick={() => {
              navigate("/products");
            }}
          >
            Shop <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "40%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="font-bold text-xl md:text-2xl flex justify-center text-green-950 mb-32">
          Share with community
        </h2>
        <div className="flex gap-4 md:gap-8 px-4 md-px-8 lg:px-24 bg-secondary py-20 relative max-h-[500px]">
          <div className=" w-1/3 -mt-28 relative group">
            <motion.img
              alt="Aromatic Fragrant Plants"
              className="w-full h-full b rounded-lg"
              initial={{ opacity: 0, translateY: "20%" }}
              whileInView={{ opacity: 1, translateY: "0" }}
              src={require("../assets/frag.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Aromatic Fragrant Plants
            </h3>
          </div>
          <div className="relative group w-1/3 -mb-11 -mt-4">
            <motion.img
              alt="Insect Repellent Plants"
              className="w-full h-full b rounded-lg"
              initial={{ opacity: 0, translateY: "20%" }}
              whileInView={{ opacity: 1, translateY: "0" }}
              src={require("../assets/insect_repeal.jpg")}
            />{" "}
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Insect Repellent Plants
            </h3>
          </div>
          {/* <div className="relative group">
            <motion.img
              alt="Low Maintenance Plants"
              className="w-full h-full b rounded-lg"
              src={require("../assets/lowm.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Low Maintenance Plants
            </h3>
          </div> */}
          <div className="w-1/3 -mt-28 relative group">
            <motion.img
              alt=""
              className="w-full h-full b rounded-lg"
              initial={{ opacity: 0, translateY: "30%" }}
              whileInView={{ opacity: 1, translateY: "0" }}
              src={require("../assets/air.jpg")}
            />{" "}
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Air Purifying Plants
            </h3>
          </div>{" "}
          <motion.button
            onClick={() => navigate("/community")}
            className="absolute -bottom-5 left-1/2 px-8 py-2 bg-quaternary hover:bg-emerald-800 transition-colors transition-opacity duration-100 flex items-center rounded-lg text-white"
            initial={{ opacity: 0, translateX: "80%" }}
            whileInView={{ opacity: 1, translateX: "0" }}
          >
            {" "}
            Explore <ChevronRight className="w-4 h-4 ml-2 " />
          </motion.button>
        </div>
      </motion.div>

      {/* New Blog Section */}
      <motion.div
        className="py-4 bg-pinky md:py-8 lg:py-12 md:my-16 flex flex-col gap-4 transition-colors duration-200 px-4 md:px-12 lg:px-24"
        initial={{ opacity: 0, translateY: "30%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="text-green-950 font-bold text-xl md:text-2xl flex justify-center">
          Discover the Perfect Plant for Your Space
        </h2>
        <div className="flex flex-col md:flex-row  items-center  gap-4 justify-between ">
          <Leaf className="relative text-tertiary mt-auto w-96 h-96 ml-auto rotate-180" />{" "}
          <motion.p
            initial={{ opacity: 0, translateX: "80%" }}
            whileInView={{ opacity: 1, translateX: "0" }}
            className="w-11/12 md:w-5/12 border-2 border-pinky text-white rounded-lg p-6 text-xl absolute z-10 shadow-[-5px_-5px_15px_2px_rgba(0,0,0,0.05),_5px_5px_10px_2px_rgba(45,48,2)]"
          >
            In our blog, we explore the art of selecting the right plants for
            your home or office. From low-light rooms to sun-drenched
            windowsills, choosing the perfect plant for your environment can be
            the difference between a thriving oasis and a wilting plant. Whether
            you’re looking for air-purifying plants for your bedroom or colorful
            blooms to brighten your workspace, our blog offers expert advice,
            seasonal recommendations, and creative ideas to help you make the
            right choice for your unique space.{" "}
            <motion.button
              className=" mt-4 items-center text-tertiary underline flex hover:scale-105 hover:gap-1 hover:text-quaternary"
              initial={{ opacity: 0, translateX: "80%" }}
              whileInView={{ opacity: 1, translateX: "0" }}
              onClick={() => navigate("/blog")}
            >
              Read More <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.p>
          <div className="relative group flex justify-end w-11/12 md:w-1/3">
            <motion.img
              alt="How to Care for Succulents"
              className="w-full h-full rounded-lg"
              initial={{ opacity: 0, translatey: "30%" }}
              whileInView={{ opacity: 1, translatey: "0" }}
              src={require("../assets/lavender-plant.jpeg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              How to Care for Succulents
            </h3>
          </div>
        </div>
      </motion.div>

      {/* Share Plants with Review Section */}
      {/*  <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "20%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="text-green-950 font-bold text-xl md:text-2xl flex justify-center">
          Share Plants with Review
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 px-4 md:px-12 lg:px-24">
          {/* Share Review Cards */}
      {/* <div className="relative group w-1/2">
            <motion.img
              alt="User's Plant Review"
              className="w-full h-full b rounded-lg"
              src={require("../assets/cowomen-1hlFqUdFv1s-unsplash.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              User's Plant Review
            </h3>
          </div>
          <div className="flex flex-col gap-3 md:gap-5 justify-center md:w-1/2">
            <h2 className="text-green-950 font-bold text-xl md:text-2xl flex justify-center">
              Post your plant on the comunity
            </h2>
            <form
              action=""
              method="post"
              className="flex flex-col gap-3 mx-auto"
            >
              <div className="flex flex-col">
                <label htmlFor="">Title:</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="outline-none focus:border-2 focus:border-quaternary rounded-lg p-2"
                />
              </div>
              <div>
                <label htmlFor="">Description</label>
                <textarea
                  placeholder="Description"
                  className="w-full p-2 mb-2 border rounded-lg resize-none outline-none focus:border-quaternary focus:border-2"
                />
              </div>
              <input type="file" required className="mb-2" />
              <button
                type="submit"
                className="bg-tertiary hover:bg-quaternary text-white p-2 rounded-lg"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </motion.div> */}

      {/* Plants Care Section */}
      <motion.div
        className="py-4 md:py-8 lg:py-12 flex flex-col gap-4 transition-colors duration-200"
        initial={{ opacity: 0, translateY: "20%" }}
        whileInView={{ opacity: 1, translateY: "0" }}
      >
        <h2 className="text-green-950 font-bold text-xl md:text-2xl flex justify-center">
          Plants Care
        </h2>

        <div className="flex flex-col md:flex-row md:gap-4 px-4 md:px-12 lg:px-24 items-center">
          <div className="relative group w-11/12 mx-auto md:w-1/2  max-h-[400]">
            <motion.img
              alt="Caring for Indoor Plants"
              className="w-full rounded-lg h-2/3"
              src={require("../assets/plantcare.jpg")}
            />
            <h3 className="absolute bottom-0 right-0 m-2 text-white opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 px-4 py-2 rounded transition-opacity">
              Caring for Indoor Plants
            </h3>
          </div>
          <div className=" w:11/12 mx-auto md:w-1/2">
            <h3 className="text-green-950 font-bold text-xl mb-4">
              Caring for Your Plants
            </h3>
            <p className="text-lg ">
              Caring for your plants is crucial for their growth and well-being.
              It's not just about watering them, but also about providing the
              right environment, nutrients, and attention. Proper care can make
              all the difference in keeping your plants healthy and thriving.
            </p>
            <p className="text-lg">
              Want to learn more about how to care for your plants? Visit our{" "}
              <Link
                to="/care-plants"
                className="text-green-800 hover:text-green-900"
              >
                Care for Plants
              </Link>{" "}
              page for expert tips and guides.
            </p>
          </div>
        </div>
      </motion.div>
      <div className="hidden text-darkpink md:flex gap-2 flex-col bg-shopping h-96  md:my-16 px-12 lg:px-24 items-start justify-center ">
        <h2 className=" font-bold text-2xl">Free Shipping Service</h2>
        <p className="text-xl">Free Shipping in Cairo and Giza</p>
        <div className=" text-darkpink flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: "#9C6955", transform: "", msFilter: "" }}
          >
            <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
          </svg>{" "}
          leafbloom2@gmail.com
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
