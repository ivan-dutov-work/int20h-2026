import type { APIRoute } from "astro";

const BACKEND_URL =
  import.meta.env.PUBLIC_BACKEND_URL ||
  import.meta.env.BACKEND_URL ||
  "http://localhost:8000";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.text();

    const response = await fetch(`${BACKEND_URL}/form/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const respText = await response.text();

    return new Response(respText, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Proxy error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
