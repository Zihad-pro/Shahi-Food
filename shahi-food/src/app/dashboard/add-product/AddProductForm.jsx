"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !description) {
      Swal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Please fill in all required fields",
      });
      return;
    }

    try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description, imageUrl, youtubeLink }),
      credentials: "include", 
    });


      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Product Added",
          text: `${name} has been added successfully!`,
          timer: 1500,
          showConfirmButton: false,
        });

        setName("");
        setImageUrl("");
        setYoutubeLink("");
        setDescription("");
        setPrice("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      <input
        type="text"
        placeholder="Food Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
      />
      <input
        type="url"
        placeholder="YouTube Recipe Link"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="p-3 border rounded-lg focus:ring-2 focus:ring-yellow-400 transition"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition cursor-pointer"
      >
        Add Product
      </button>
    </form>
  );
}
