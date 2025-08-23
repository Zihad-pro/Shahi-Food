// /app/api/products/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  const { name, price, description, imageUrl, youtubeLink } = await req.json();
  const client = await clientPromise;
  const db = client.db("shahifood");

  const product = {
    name,
    price: parseFloat(price),
    description,
    imageUrl,
    youtubeLink,
    createdAt: new Date(),
  };

  const result = await db.collection("products").insertOne(product);

  return new Response(
    JSON.stringify({
      ok: true,
      product: { ...product, id: result.insertedId },
    }),
    { status: 200 }
  );
}

// ✅ New GET method
export async function GET() {
  const client = await clientPromise;
  const db = client.db("shahifood");

  const products = await db.collection("products").find().toArray();

  return new Response(JSON.stringify(products), { status: 200 });
}

