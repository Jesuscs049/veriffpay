export default function handler(req, res) {
  const { card } = req.body;

  const last = card.number.slice(-1);

  // lógica simple pero realista
  if (last % 3 === 0) {
    return res.json({
      status: "error",
      message: "Error 24: rechazada"
    });
  }

  if (last % 2 === 0) {
    return res.json({
      status: "error",
      message: "Error 12: verificación"
    });
  }

  return res.json({
    status: "success",
    message: "Pago aprobado ✔"
  });
}
