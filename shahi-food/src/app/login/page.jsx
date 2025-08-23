"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

const handleCredentialsLogin = async (e) => {
  e.preventDefault();

  try {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });


    const data = await res.json();

    if (!data.ok) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Your name or email is incorrect, or you are not registered.",
      });
      return;
    }

    // User exists in DB, now call signIn
    const result = await signIn("credentials", {
      redirect: false,
      name,
      email,
    });

    if (result?.ok) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logged in successfully!",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => router.push("/"), 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Credentials are invalid.",
      });
    }
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong. Please try again.",
    });
  }
};


  const handleGithubLogin = async () => {
    await signIn("github", { callbackUrl: "/" });
    // GitHub login will automatically redirect to callbackUrl
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
        <h1 className="text-2xl font-bold mb-6">Login to Shahi Food</h1>

        {/* Credentials Login */}
        <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-4">
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
          <button
            type="submit"
            className="px-4 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition cursor-pointer"
          >
            Login
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* GitHub Login */}
        <button
          onClick={handleGithubLogin}
          className="flex items-center justify-center w-full gap-2 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          <FaGithub size={20} /> Continue with GitHub
        </button>

        <div className="mt-4 text-sm text-gray-600">
          Don't have an account yet?{" "}
          <Link href="/register">
            <span className="text-blue-500 cursor-pointer hover:underline">
              Register
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
