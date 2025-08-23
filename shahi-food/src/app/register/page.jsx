"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      name,
      email,
      image: photo,
    });

    if (result?.ok) {
      Swal.fire({
        icon: "success",
        title: "Registered!",
        text: "Your account has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      
      setTimeout(() => router.push("/"), 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again with valid details.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/shahifood.jpg"
              className="rounded-full"
              alt="Shahi Food Logo"
              width={150}
              height={80}
            />
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">Register for Shahi Food</h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Photo URL"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="p-3 border rounded-lg"
          />

          <button
            type="submit"
            className="px-4 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition cursor-pointer"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
