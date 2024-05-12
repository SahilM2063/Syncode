import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema"; // Assuming you have a schema file similar to your original setup

// Initialize the database connection using Vercel's PostgreSQL client
const db = drizzle(sql, { schema });

// Export the database instance
export { db };

// If you have specific tables or queries you want to export, you can define them here
// For example, if you had a table definition in your original code, you would adapt it to use Vercel's syntax
