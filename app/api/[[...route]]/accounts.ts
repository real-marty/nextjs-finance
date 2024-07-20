import { db } from "@/db/drizzle";
import { accounts } from "@/drizzle/schema/schema";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { HTTPException } from "hono/http-exception";
import { Hono } from "hono";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth) {
    throw new HTTPException(401, {
      res: c.json({ error: "Unauthorized" }, 401),
    });
  }

  const data = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts);

  return c.json({
    data,
  });
});

export default app;
