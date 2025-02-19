import { app } from "./app.js";

const port = Number(Deno.env.get("PORT")) || 7777; // Use Render's assigned port, fallback to 7777 locally
console.log(`Server running on http://0.0.0.0:${port}`);

app.listen({ port, hostname: "0.0.0.0" }); // Ensure Render detects the open port
