import type { APIRoute } from "astro";

const BACKEND_URL =
  import.meta.env.PUBLIC_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:8000";

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/skills/`);
    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch skills" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
