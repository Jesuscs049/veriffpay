const db = {}; // simulación (luego puedes usar Supabase)

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, step, payload } = req.body;

  if (!phone) {
    return res.json({ status: "error", message: "No phone" });
  }

  if (!db[phone]) {
    db[phone] = {
      step: "start",
      attempts: 0
    };
  }

  const user = db[phone];

  // 🔁 LÓGICA TIPO FLUJO
  if (step === "start") {
    user.step = "payment";

    return res.json({
      status: "ok",
      next: "payment",
      message: "Ingresa datos de pago"
    });
  }

  if (step === "payment") {
    user.attempts++;

    // simulación de error realista
    if (user.attempts < 2) {
      return res.json({
        status: "error",
        next: "payment",
        message: "Error 24: tarjeta rechazada"
      });
    }

    user.step = "completed";

    return res.json({
      status: "ok",
      next: "completed",
      message: "Pago verificado correctamente"
    });
  }

  return res.json({
    status: "unknown",
    next: "start"
  });
}
