import Link from "next/link";

async function fetchProduct(id) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store", // Always fresh
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({ params }) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">Product not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Back Button */}
        <Link href="/">
          <button className="inline-block px-5 py-2 bg-yellow-600 text-white font-semibold text-xl shadow-lg hover:bg-yellow-700 cursor-pointer transition text-left w-full">
            ← Back to Home
          </button>
        </Link>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-2">
            <strong>Price:</strong> ${product.price}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Description:</strong> {product.description}
          </p>

          {product.youtubeLink && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Video Recipe:</h2>
              <a
                href={product.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-600 font-bold hover:underline"
              >
                ▶ Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
