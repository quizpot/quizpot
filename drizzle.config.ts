import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./node_modules/@quizpot/quizcore/dist/db/schema.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
