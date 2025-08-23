"use client";
import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-yellow-100 via-white to-yellow-50 py-20">
      <div className="max-w-7xl  mx-auto flex flex-col-reverse lg:flex-row items-center px-6  mt-25">
        {/* Left content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Discover <span className="text-yellow-600">Delicious Meals</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore a world of flavors with thousands of recipes from around the
            globe. Find your next favorite dish and bring it to life in your
            kitchen!
          </p>
          <a
            href="#meals"
            className="inline-block px-8 py-3 bg-yellow-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-yellow-700 transition"
          >
            Explore Meals
          </a>
        </div>

        {/* Right image */}
        <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
          <img
            src="https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"
            alt="Delicious Food"
            className="rounded-2xl shadow-2xl w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
