export default {
  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/ws')) {

    }

    if (url.pathname.startsWith("/api")) {
      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) return response;
    } catch {

    }

    return fetch(`http://localhost:5173${url.pathname}${url.search}`);
  }
};