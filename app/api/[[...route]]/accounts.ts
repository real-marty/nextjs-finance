import { db } from "@/db/drizzle";
import { accounts } from "@/drizzle/schema/schema";
import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  const data = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts);

  return c.json({
    data,
  });
});

export default app;
