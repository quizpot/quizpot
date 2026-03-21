import { compare } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { db } from "../db";
import { signInSchema } from "./zod";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials);

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1);

        if (!user) {
          throw new Error("Invalid credentials."); 
        }
 
        const isCorrect = await compare(password, user.pwHash);

        if (!isCorrect) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          name: user.nickname,
          icon: user.icon,
        };
      }
    })
  ],
});