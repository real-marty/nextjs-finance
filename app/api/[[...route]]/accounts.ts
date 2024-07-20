import { db } from "@/db/drizzle";
import { accounts } from "@/drizzle/schema/schema";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { HTTPException } from "hono/http-exception";
import { Hono } from "hono";
import { eq } from "drizzle-orm";

const app = new Hono().get("/", clerkMiddleware(), async (c) => {
  const auth = getAuth(c);

  if (!auth) {
    throw new HTTPException(401, {
      res: c.json({ error: "Unauthorized" }, 401),
    });
  }
  if (!auth.userId) {
    throw new HTTPException(401, {
      res: c.json({ error: "UserId not valid " }, 401),
    });
  }

  const data = await db
    .select({ id: accounts.id, name: accounts.name })
    .from(accounts)
    .where(eq(accounts.userId, auth.userId));

  return c.json({
    data,
  });
});

export default app;
