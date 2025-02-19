import { app } from "./app.js";

const port = Number(Deno.env.get("PORT")) || 7777;
console.log(`🔄 Attempting to start server on http://0.0.0.0:${port}...`);

await app.listen({ port, hostname: "0.0.0.0" })
  .then(() => {
    console.log(`✅ Server running on http://0.0.0.0:${port}`);

    // Make a request to the server itself to confirm it's responding
    setTimeout(async () => {
      try {
        const res = await fetch(`http://0.0.0.0:${port}`);
        console.log(`🟢 Server is responding with status: ${res.status}`);
      } catch (err) {
        console.error("🔴 Server did not respond:", err);
      }
    }, 5000);
  })
  .catch((error) => {
    console.error("❌ Failed to start server:", error);
    Deno.exit(1);
  });
