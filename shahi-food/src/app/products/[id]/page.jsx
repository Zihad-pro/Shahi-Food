import Link from "next/link";
import React from "react";

async function fetchMeal(id) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    { cache: "no-store" } // Always fetch fresh data
  );
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

export default async function MealDetail({ params }) {
  const meal = await fetchMeal(params.id);

  if (!meal) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Meal not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Back Button */}
        <Link href="/">
          <button className="inline-block px-5 py-2 bg-yellow-600 text-white font-semibold text-xl  shadow-lg hover:bg-yellow-700 cursor-pointer transition text-left w-full">
            ← Back to Home
          </button>
        </Link>
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-100 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{meal.strMeal}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Category:</strong> {meal.strCategory}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Area:</strong> {meal.strArea}
          </p>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Ingredients:</h2>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            {Array.from({ length: 20 }, (_, i) => i + 1)
              .map((n) => ({
                ingredient: meal[`strIngredient${n}`],
                measure: meal[`strMeasure${n}`],
              }))
              .filter((item) => item.ingredient)
              .map((item, idx) => (
                <li key={idx}>
                  {item.ingredient} - {item.measure}
                </li>
              ))}
          </ul>
          <h2 className="text-2xl font-semibold mt-4 mb-2">Instructions:</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {meal.strInstructions}
          </p>
          {meal.strYoutube && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Video Recipe:</h2>
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 font-bold hover:underline"
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
