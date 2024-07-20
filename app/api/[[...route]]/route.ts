import { Hono } from "hono";
import { handle } from "hono/vercel";

import accounts from "./accounts";
import { HTTPException } from "hono/http-exception";

//! Module build failed: UnhandledSchemeError: Reading from "node:stream" is not handled by plugins (Unhandled scheme).
//! Webpack supports "data:" and "file:" URIs by default.
//! You may need an additional plugin to handle "node:" URIs.
//! Import trace for requested module:

//! CAUSES ERROR WITH CLOUDFLARE WORKERS
// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json({ error: "Internal Server Error" }, 500);
});

const routes = app.route("/accounts", accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
