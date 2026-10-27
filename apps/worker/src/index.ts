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

    // const isDev = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    // console.log('hostname: ' + url.hostname)

    // if (isDev) {
    //   try {
    //     const viteResponse = await fetch(`http://localhost:5173${url.pathname}${url.search}`, {
    //       method: request.method,
    //       headers: request.headers,
    //       body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null,
    //     });
    //     console.log('vite response from ' + `http://localhost:5173${url.pathname}${url.search}` + ' : ' + viteResponse.status)
    //     if (viteResponse.ok || viteResponse.status === 304) {
    //       return viteResponse;
    //     }
    //   } catch {
    //     throw new Error("Vite not running in dev.")
    //   }
    // }

    return env.ASSETS.fetch(request);
  }
};