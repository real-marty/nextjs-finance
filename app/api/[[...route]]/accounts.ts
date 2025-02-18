import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/drizzle/schema/schema";

import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { zValidator } from "@hono/zod-validator";

import { Hono } from "hono";
import { and, eq, inArray } from "drizzle-orm";

import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
  .get(
    "/", clerkMiddleware(), async (c) => {
      const auth = getAuth(c);

      //#region  //! sample for older versions of HONO
      // if (!auth) {
      //   throw new HTTPException(401, {
      //     res: c.json({ error: "Unauthorized" }, 401),
      //   });
      // }
      // if (!auth.userId) {
      //   throw new HTTPException(401, {
      //     res: c.json({ error: "UserId not valid " }, 401),
      //   });
      // }
      //#endregion

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .select({ id: accounts.id, name: accounts.name })
        .from(accounts)
        .where(eq(accounts.userId, auth.userId));

      return c.json({
        data,
      });
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "UserId not valid " }, 401);
      }

      const [data] = await db
        .insert(accounts)
        .values({
          id: createId(),
          userId: auth.userId,
          ...values,
        })
        .returning();

      return c.json({ data });
    },
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator("json", z.object({ ids: z.array(z.string()) })),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({ id: accounts.id });

      return c.json({ data });
    },
  )

export default app;
