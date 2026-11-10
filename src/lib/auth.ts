import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URI as string, {
  serverSelectionTimeoutMS: 8000,
});

const db = client.db("bangla_news");

const isProd = process.env.NODE_ENV === "production";

const extraTrustedOrigins = (
  process.env.BETTER_AUTH_TRUSTED_ORIGINS?.split(",") ?? []
)
  .map((origin) => origin.trim())
  .filter(Boolean);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    // Dev only: the app may run on any localhost port (3000 is often taken),
    // but the browser still sends that port as the `Origin` header.
    ...(isProd ? [] : ["http://localhost:*", "http://127.0.0.1:*"]),
    ...extraTrustedOrigins,
  ].filter((origin): origin is string => Boolean(origin)),
  database: mongodbAdapter(db, {
    client,
  }),
});
