import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { MongoClient } from "mongodb";

let client;
async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }
  return client.db("shahifood");
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        image: { label: "Photo", type: "text" },
      },
      async authorize(credentials) {
        const db = await connectDB();
        const usersCollection = db.collection("users");

        let user = await usersCollection.findOne({ email: credentials.email });

        if (!user) {
          const newUser = {
            name: credentials.name,
            email: credentials.email,
            image: credentials.image || "",
            createdAt: new Date(),
          };
          const result = await usersCollection.insertOne(newUser);

          user = { ...newUser, id: result.insertedId.toString() };
        } else {
          user = { ...user, id: user._id.toString() };
        }

        return user;
      },
    }),

    // GitHub OAuth provider
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },

  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
