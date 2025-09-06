import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env" });
const isProduction = process.env.NODE_ENV === "production";
export default defineConfig({
  schema: "./lib/db/schema.ts",  // adjust if different
  out: "./lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: isProduction ? process.env.PRODUCTION_DATABASE_URL! : process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
