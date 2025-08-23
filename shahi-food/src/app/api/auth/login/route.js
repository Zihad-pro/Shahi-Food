import clientPromise from "@/app/lib/mongodb";


export async function POST(req) {
  try {
    const { name, email } = await req.json();
    const client = await clientPromise;
    const db = client.db("shahifood"); // your DB name
    const users = db.collection("users");

    const user = await users.findOne({ name, email });

    if (!user) {
      return new Response(
        JSON.stringify({ ok: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ ok: true, user }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
    });
  }
}
