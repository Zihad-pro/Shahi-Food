"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const Discounts = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await response.json();
        // Add fake discount for demo
        const discountedMeals = (data.meals || []).map((meal) => ({
          ...meal,
          discount: Math.floor(Math.random() * 40) + 10, // 10% – 50%
        }));
        setMeals(discountedMeals);
      } catch (error) {
        console.error("Error fetching meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 border-4 border-t-4 border-yellow-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            🏷️ Explore Now{" "}
            <span className="text-yellow-600">Discounts Today</span>
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Today’s best meal deals just for you 🍽️
          </p>
        </div>

        {meals.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No discounted meals available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {meals.map((meal) => {
              const oldPrice = (Math.random() * 30 + 10).toFixed(2);
              const newPrice = (oldPrice * (1 - meal.discount / 100)).toFixed(
                2
              );
              return (
                <div
                  key={meal.idMeal}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      className="w-full h-52 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                      -{meal.discount}%
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                      {meal.strMeal}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {meal.strCategory} • {meal.strArea}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 line-through">
                        ${oldPrice}
                      </span>
                      <span className="text-xl font-bold text-yellow-600">
                        ${newPrice}
                      </span>
                    </div>
                    <Link href={`/products/${meal.idMeal}`}>
                      <button className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-lg font-medium hover:bg-yellow-700 transition cursor-pointer">
                        View recipe
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Discounts;
