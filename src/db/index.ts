import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  var db: PostgresJsDatabase<typeof schema>;
}
let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DB_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DB_URL!), { schema });
  }
  db = global.db;
}
export { db };
