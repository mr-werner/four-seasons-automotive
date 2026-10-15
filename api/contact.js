// Appointment requests. Sends through Resend when configured; otherwise answers in demo mode.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : (req.body || {});
  if (body.website) return res.status(200).json({ success: true }); // honeypot

  const { name, phone, email, vehicle, service, date, notes } = body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: "Please add your name and phone number." });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return res.status(200).json({ success: true, demo: true });
  }

  const rows = [
    ["Name", name], ["Phone", phone], ["Email", email], ["Vehicle", vehicle],
    ["Service", service], ["Preferred date", date], ["Notes", notes],
  ].filter(([, value]) => value);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email || undefined,
        subject: `Appointment request: ${String(name).slice(0, 80)}`,
        html: rows.map(([label, value]) => `<p><strong>${label}:</strong><br/>${escapeHtml(String(value).slice(0, 3000))}</p>`).join(""),
      }),
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Appointment request error:", error);
    return res.status(502).json({ success: false, message: "We couldn't send that right now. Please call the shop." });
  }
}

function safeParse(value) {
  try { return JSON.parse(value); } catch { return {}; }
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
