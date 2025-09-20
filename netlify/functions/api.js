export async function handler(event) {
  const origin = event.headers.origin || "*";

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
      body: "",
    };
  }

  const API_BASE = "https://users-crud-api-production-9c59.up.railway.app/api/v1";
  const splat = event.path.replace("/.netlify/functions/api/", "");
  const url = `${API_BASE}/${splat}`;

  const init = {
    method: event.httpMethod,
    headers: {
      "Content-Type": event.headers["content-type"] || "application/json",
      Authorization: event.headers.authorization || "",
    },
    body: ["GET", "HEAD"].includes(event.httpMethod) ? undefined : event.body,
  };

  try {
    const resp = await fetch(url, init);
    const text = await resp.text();
    const contentType = resp.headers.get("content-type") || "application/json";

    return {
      statusCode: resp.status,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
        "Content-Type": contentType,
      },
      body: text,
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type,Authorization",
      },
      body: JSON.stringify({ error: "Proxy failed", detail: String(e) }),
    };
  }
}
