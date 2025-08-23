"use client";
import React from "react";

const upcomingRecipes = [
  {
    id: 1,
    title: "Spicy Fusion Pasta",
    category: "Italian Fusion",
    image: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
    release: "Coming Soon",
  },
  {
    id: 2,
    title: "Tandoori Burger",
    category: "Indian Street Food",
    image: "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
    release: "Coming Soon",
  },
  {
    id: 3,
    title: "Avocado Sushi Roll",
    category: "Japanese",
    image: "https://www.themealdb.com/images/media/meals/1525873040.jpg",
    release: "Coming Soon",
  },
  {
    id: 4,
    title: "Mediterranean Wrap",
    category: "Mediterranean",
    image: "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
    release: "Coming Soon",
  },
];

const Product = () => {
  return (
    <section className="py-16 " id="recipes">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
           Upcoming <span className="text-yellow-600">Recipes</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {upcomingRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="md:w-80 h-52 object-cover"
                />
                {/* Coming Soon Badge */}
                <span className="absolute top-3 left-3 bg-yellow-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                  {recipe.release}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                  {recipe.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{recipe.category}</p>

                <button
                  disabled
                  className="w-full text-center py-2 bg-gray-400 text-white font-semibold text-md rounded-xl shadow-lg cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Product;
