import { app } from "./app.js";

const port = Number(Deno.env.get("PORT")) || 7777;
console.log(`Server running on http://0.0.0.0:${port}`);

try {
  await app.listen({ port, hostname: "0.0.0.0" });
} catch (error) {
  console.error("Error starting server:", error);
  Deno.exit(1);
}
