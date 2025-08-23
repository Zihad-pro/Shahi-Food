// /app/api/products/[id]/route.js
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("shahifood");

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(
        JSON.stringify({ ok: false, message: "Product not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, message: "Invalid ID or server error" }),
      { status: 500 }
    );
  }
}
