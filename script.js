const form = document.getElementById("payment-form");
const statusText = document.getElementById("status");

let phone = "user1"; // puedes cambiar esto luego

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const card = {
    name: data.get("cc-name"),
    number: data.get("cc-number"),
    exp: data.get("cc-exp"),
    cvc: data.get("cc-csc")
  };

  statusText.innerText = "Processing...";

  const res = await fetch("/api/flow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      phone,
      card
    })
  });

  const result = await res.json();

  statusText.innerText = result.message;

  // 🔁 card adder automático
  if (result.status === "error") {
    form.reset(); // limpia para siguiente tarjeta
  }
});
