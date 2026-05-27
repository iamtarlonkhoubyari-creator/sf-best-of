export const runtime = "edge";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  const obj = (payload ?? {}) as Record<string, unknown>;
  const raw = typeof obj.message === "string" ? obj.message : "";
  const message = raw.trim().slice(0, 2000);
  if (!message) {
    return Response.json({ error: "empty message" }, { status: 400 });
  }
  console.log(
    `[feedback ${new Date().toISOString()}]`,
    JSON.stringify({ message }),
  );
  return Response.json({ ok: true });
}
