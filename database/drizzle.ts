import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config"; // Make sure this exports `env.databaseUrl`

const sql = neon(config.env.databaseUrl!); // Ensure URL is correct
export const db = drizzle(sql); // ✅ Proper usage

