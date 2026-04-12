const form = document.getElementById("payment-form");
const statusText = document.getElementById("status");

// formateo básico (mejora UX y ayuda a Chrome)
const numberInput = form.querySelector('[name="cc-number"]');
const expInput = form.querySelector('[name="cc-exp"]');

numberInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0, 16);
  value = value.replace(/(.{4})/g, "$1 ").trim();
  e.target.value = value;
});

expInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0, 4);
  if (value.length >= 3) {
    value = value.substring(0, 2) + "/" + value.substring(2);
  }
  e.target.value = value;
});

// submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const payload = {
    name: data.get("cc-name"),
    number: data.get("cc-number"),
    exp: data.get("cc-exp"),
    cvc: data.get("cc-csc")
  };

  // simulación de proceso (puedes conectar tu API aquí)
  statusText.innerText = "Processing...";

  setTimeout(() => {
    statusText.innerText = "Payment processed ✔";
  }, 1500);

  console.log("DATA:", payload);
});
