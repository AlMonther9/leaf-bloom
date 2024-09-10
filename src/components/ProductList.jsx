import React, { useState, useCallback, useMemo } from "react";
/* import CartItem from "../redux/CartItem";
import { addItem } from "../redux/CartSlice"; */
import { useDispatch } from "react-redux";

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
        },
        {
          name: "Spider Plant",
          image:
            "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
        },
        {
          name: "Peace Lily",
          image:
            "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
        },
        {
          name: "Boston Fern",
          image:
            "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
          description: "Adds humidity to the air and removes toxins.",
          cost: "$20",
        },
        {
          name: "Rubber Plant",
          image:
            "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
          description: "Easy to care for and effective at removing toxins.",
          cost: "$17",
        },
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14",
        },
      ],
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image:
            "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Jasmine",
          image:
            "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18",
        },
        {
          name: "Rosemary",
          image:
            "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
          description: "Invigorating scent, often used in cooking.",
          cost: "$15",
        },
        {
          name: "Mint",
          image:
            "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
          description: "Refreshing aroma, used in teas and cooking.",
          cost: "$12",
        },
        {
          name: "Lemon Balm",
          image:
            "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Citrusy scent, relieves stress and promotes sleep.",
          cost: "$14",
        },
        {
          name: "Hyacinth",
          image:
            "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
          description:
            "Hyacinth is a beautiful flowering plant known for its fragrant.",
          cost: "$22",
        },
      ],
    },
    {
      category: "Insect Repellent Plants",
      plants: [
        {
          name: "oregano",
          image:
            "https://cdn.pixabay.com/photo/2015/05/30/21/20/oregano-790702_1280.jpg",
          description:
            "The oregano plants contains compounds that can deter certain insects.",
          cost: "$10",
        },
        {
          name: "Marigold",
          image:
            "https://cdn.pixabay.com/photo/2022/02/22/05/45/marigold-7028063_1280.jpg",
          description:
            "Natural insect repellent, also adds color to the garden.",
          cost: "$8",
        },
        {
          name: "Geraniums",
          image:
            "https://cdn.pixabay.com/photo/2012/04/26/21/51/flowerpot-43270_1280.jpg",
          description:
            "Known for their insect-repelling properties while adding a pleasant scent.",
          cost: "$20",
        },
        {
          name: "Basil",
          image:
            "https://cdn.pixabay.com/photo/2016/07/24/20/48/tulsi-1539181_1280.jpg",
          description: "Repels flies and mosquitoes, also used in cooking.",
          cost: "$9",
        },
        {
          name: "Lavender",
          image:
            "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20",
        },
        {
          name: "Catnip",
          image:
            "https://cdn.pixabay.com/photo/2015/07/02/21/55/cat-829681_1280.jpg",
          description: "Repels mosquitoes and attracts cats.",
          cost: "$13",
        },
      ],
    },
    {
      category: "Medicinal Plants",
      plants: [
        {
          name: "Aloe Vera",
          image:
            "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
          description: "Soothing gel used for skin ailments.",
          cost: "$14",
        },
        {
          name: "Echinacea",
          image:
            "https://cdn.pixabay.com/photo/2014/12/05/03/53/echinacea-557477_1280.jpg",
          description: "Boosts immune system, helps fight colds.",
          cost: "$16",
        },
        {
          name: "Peppermint",
          image:
            "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496773_1280.jpg",
          description: "Relieves digestive issues and headaches.",
          cost: "$13",
        },
        {
          name: "Lemon Balm",
          image:
            "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
          description: "Calms nerves and promotes relaxation.",
          cost: "$14",
        },
        {
          name: "Chamomile",
          image:
            "https://cdn.pixabay.com/photo/2016/08/19/19/48/flowers-1606041_1280.jpg",
          description: "Soothes anxiety and promotes sleep.",
          cost: "$15",
        },
        {
          name: "Calendula",
          image:
            "https://cdn.pixabay.com/photo/2019/07/15/18/28/flowers-4340127_1280.jpg",
          description: "Heals wounds and soothes skin irritations.",
          cost: "$12",
        },
      ],
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "ZZ Plant",
          image:
            "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          description: "Thrives in low light and requires minimal watering.",
          cost: "$25",
        },
        {
          name: "Pothos",
          image:
            "https://cdn.pixabay.com/photo/2018/11/15/10/32/plants-3816945_1280.jpg",
          description: "Tolerates neglect and can grow in various conditions.",
          cost: "$10",
        },
        {
          name: "Snake Plant",
          image:
            "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
          description:
            "Needs infrequent watering and is resilient to most pests.",
          cost: "$15",
        },
        {
          name: "Cast Iron Plant",
          image:
            "https://cdn.pixabay.com/photo/2017/02/16/18/04/cast-iron-plant-2072008_1280.jpg",
          description: "Hardy plant that tolerates low light and neglect.",
          cost: "$20",
        },
        {
          name: "Succulents",
          image:
            "https://cdn.pixabay.com/photo/2016/11/21/16/05/cacti-1846147_1280.jpg",
          description: "Drought-tolerant plants with unique shapes and colors.",
          cost: "$18",
        },
        {
          name: "Aglaonema",
          image:
            "https://cdn.pixabay.com/photo/2014/10/10/04/27/aglaonema-482915_1280.jpg",
          description: "Requires minimal care and adds color to indoor spaces.",
          cost: "$22",
        },
      ],
    },
  ];
  const PlantCard = React.memo(({ plant, onAddToCart, isAdded }) => (
    <div className="w-full max-w-sm h-[350px] mb-5 p-3 bg-white border border-gray-300 rounded-md text-center relative hover:scale-105 transition-transform duration-300 ease-in-out z-10 flex flex-col justify-between">
      <div>
        <img
          className="w-full h-48 object-cover mb-2.5 rounded-lg"
          src={plant.image}
          alt={plant.name}
        />
        <div className="font-bold mb-2.5">{plant.name}</div>
        <div className="mb-2.5">{plant.description}</div>
      </div>
      <div>
        <div className="text-red-600 text-lg mt-auto">{plant.cost}</div>
        <button
          className={`bg-green-600 text-white border-none rounded-lg py-2.5 px-5 cursor-pointer transition-colors duration-300 ease-in-out ${
            isAdded ? "bg-gray-500" : "hover:bg-green-700"
          }`}
          onClick={() => onAddToCart(plant)}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  ));
  
  function ProductList() {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});
  
    const handlePlantsClick = useCallback((e) => {
      e.preventDefault();
      setShowCart(false);
    }, []);
  
    const handleContinueShopping = useCallback(() => {
      setShowCart(false);
    }, []);
  
    /* const handleAddToCart = useCallback(
      (plant) => {
        dispatch(addItem(plant));
        setAddedToCart((prevState) => ({
          ...prevState,
          [plant.name]: true,
        }));
      },
      [dispatch]
    ); */
  
    const plantCategories = useMemo(() => {
      return plantsArray.map((category) => ({
        ...category,
        plants: category.plants.map((plant) => ({
          ...plant,
          isAdded: addedToCart[plant.name] || false,
        })),
      }));
    }, [addedToCart]);
  
    const renderPlantCategories = useCallback(() => (
      plantCategories.map((category, index) => (
        <div key={index} className="w-full max-w-6xl">
          <h1 className="text-left font-bold text-2xl my-5">
            <div>{category.category}</div>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-5 place-items-center">
            {category.plants.map((plant, plantIndex) => (
               <PlantCard
                key={plantIndex}
                plant={plant}
                /* onAddToCart={handleAddToCart} */
                isAdded={plant.isAdded}
              />
            ))}
          </div>
        </div>
      ))
    ), [plantCategories, /* handleAddToCart */]);

    return (
      <div className="flex flex-col w-11/12 mx-auto bg-gray-100 min-h-screen">
        <div className="flex items-center md:items-start pl-28 mt-24">
          <button
            onClick={handlePlantsClick}
            className="text-green-600 text-3xl no-underline"
          >
            Plants
          </button>
        </div>

         {showCart ? (
          {/* <CartItem onContinueShopping={handleContinueShopping} /> */}
        ) : (
          <div className="flex flex-col items-center justify-center">
            {plantCategories.length > 0 ? (
              renderPlantCategories()
            ) : (
              <div className="text-center text-2xl text-gray-600">
                No plants available. Please check back later.
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  export default ProductList;