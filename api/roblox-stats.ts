import type { IncomingMessage, ServerResponse } from "node:http";
import { robloxStats, cacheControl } from "../server/roblox.ts";

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", cacheControl);
  response.setHeader("X-Content-Type-Options", "nosniff");
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }
  const result = await robloxStats.get();
  response.statusCode = 200;
  response.end(request.method === "HEAD" ? undefined : JSON.stringify(result));
}
