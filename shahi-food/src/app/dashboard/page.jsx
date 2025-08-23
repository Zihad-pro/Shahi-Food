"use client";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const DashboardPage = () => {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: false });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 z-50 w-64 h-full bg-gradient-to-b from-yellow-50 via-white to-yellow-100 text-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 flex flex-col items-center border-b border-yellow-300 h-full">
          <Link href="/">
            <Image
              src="/shahifood.jpg"
              alt="Shahi Food Logo"
              width={90}
              height={90}
              className="rounded-full border-2 border-yellow-400 shadow-lg"
            />
          </Link>
          <h2 className="mt-4 text-xl font-extrabold tracking-tight">
            Shahi Food
          </h2>

          <nav className="mt-10 flex flex-col w-full gap-2 h-svh">
            <Link
              href="dashboard/add-product"
              className="flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-gray-800 hover:bg-yellow-400 hover:text-white transition-colors duration-200"
            >
              <FaPlus size={18} /> Add Product
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto mb-6 w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Hamburger Menu for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors duration-200 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 ml-0 md:ml-64">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto flex flex-col items-center gap-8 transition-all duration-300">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name}
              width={140}
              height={140}
              className="rounded-full border-4 border-yellow-200 shadow-xl"
            />
          ) : (
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-yellow-400 text-white text-5xl font-bold shadow-xl">
              {session?.user?.name?.[0] || "U"}
            </div>
          )}
          <h1 className="text-4xl font-extrabold text-yellow-900 tracking-tight">
            Welcome, {session?.user?.name}!
          </h1>
          <p className="text-gray-600 text-lg text-center max-w-2xl leading-relaxed">
            Manage your Shahi Food products efficiently. Add new items, monitor
            orders, and manage users all from this dashboard. Your data is safe
            and secure.
          </p>

          <Link
            href="dashboard/add-product"
            className="mt-4 px-8 py-3 bg-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:bg-yellow-700 transition-colors duration-200 flex items-center gap-2"
          ><FaPlus />
            Add New Product
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
