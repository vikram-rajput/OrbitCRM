// src/db/index.ts
import { config } from "dotenv";
config(); // loads .env.local in dev, .env.production in prod if set

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

type AnyDb = NodePgDatabase | NeonHttpDatabase;

const isProd = process.env.NODE_ENV === "production";
const hasNeon = !!process.env.PRODUCTION_DATABASE_URL;

let db: AnyDb;

if (isProd && hasNeon) {
  // ✅ Production on Neon (fetch-based)
  const sql = neon(process.env.PRODUCTION_DATABASE_URL!);
  db = drizzleNeon(sql);
} else {
  // ✅ Development on local Postgres (pg-based)
  const pool =
    (globalThis as any).__dbPool ??
    new Pool({
      connectionString: process.env.DATABASE_URL
      // ssl: false, // local usually no SSL
    });

  if (process.env.NODE_ENV !== "production") {
    (globalThis as any).__dbPool = pool; // avoid pool leaks in Next dev
  }

  db = drizzleNode(pool);
}

export { db };
