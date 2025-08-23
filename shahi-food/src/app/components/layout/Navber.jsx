"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Swal from "sweetalert2";

const Navbar = () => {
  const { data: session, status } = useSession();


  const navLinks = (
    <>
      <li className="font-semibold">
        <Link href="#home">Home</Link>
      </li>
      <li className="font-semibold">
        <Link href="#meals">Products</Link>
      </li>
      <li className="font-semibold">
        <Link href="#recipes">Upcoming recipes</Link>
      </li>
      <li className="font-semibold">
        {status === "authenticated" ? (
          <Link href="/dashboard">Dashboard</Link>
        ) : (
          <Link href="/login">Dashboard</Link>
        )}
      </li>
    </>
  );

  const handleLogout = async () => {
    await signOut({ redirect: false }); // prevent auto redirect
    Swal.fire({
      icon: "success",
      title: "Logged out!",
      text: "You have successfully logged out.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="navbar max-w-7xl mx-auto">
      <div className="navbar-start py-2">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow bg-black"
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo + Brand Name */}
        <Link href="/" className="flex items-center gap-2 text-xl">
          <Image
            src="/shahifood.jpg"
            className="rounded-full"
            alt="Shahi Food Logo"
            width={50}
            height={60}
          />
          <span className="font-bold italic">Shahi Food</span>
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right section: Login / Profile + Logout */}
      <div className="navbar-end flex items-center gap-3">
        {status === "authenticated" ? (
          <>
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 text-white">
                {session.user?.name?.[0] || "U"}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-red-700 cursor-pointer transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="px-8 py-2 bg-yellow-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-yellow-700 cursor-pointer transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
