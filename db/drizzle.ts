import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/drizzle/schema/schema";

// for migrations
export const migrationClient = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

// for query purposes
export const queryClient = postgres(process.env.DATABASE_URL as string);

// for db connection
export const db = drizzle(queryClient, { schema });
