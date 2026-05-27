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

  const at = new Date().toISOString();
  console.log(`[feedback ${at}]`, JSON.stringify({ message }));

  // Forward to a Google Sheet via an Apps Script web app
  const webhook = process.env.FEEDBACK_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ at, message }),
        redirect: "follow",
      });
    } catch (err) {
      console.error("[feedback webhook error]", err);
      // best-effort: don't fail the user submission
    }
  }

  return Response.json({ ok: true });
}
