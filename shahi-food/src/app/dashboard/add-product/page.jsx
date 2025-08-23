"use client";

import { useSession } from "next-auth/react";
import AddProductForm from "./AddProductForm";
import Image from "next/image";
import Link from "next/link";

export default function AddProductPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl">
          You must{" "}
          <a href="/login" className="underline">
            login
          </a>{" "}
          to access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Link href="/" className="flex items-center gap-2 text-xl ">
        <Image
          src="/shahifood.jpg"
          className="rounded-full "
          alt="Shahi Food Logo"
          width={50}
          height={60}
        />
        <span className="font-bold italic">Shahi Food</span>
      </Link>
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
