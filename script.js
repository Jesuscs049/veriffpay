const statusText = document.getElementById("status");

let currentStep = "start";
let userPhone = "";

// cambiar UI
function showStep(step) {
  document.getElementById("step-start").classList.add("hidden");
  document.getElementById("step-payment").classList.add("hidden");
  document.getElementById("step-done").classList.add("hidden");

  document.getElementById("step-" + step).classList.remove("hidden");
}

// iniciar flujo
async function startFlow() {
  const phone = document.getElementById("phone").value;
  userPhone = phone;

  const res = await fetch("/api/flow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone,
      step: "start"
    })
  });

  const data = await res.json();

  statusText.innerText = data.message;
  currentStep = data.next;

  showStep(data.next);
}

// pago
document
  .getElementById("step-payment")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = Object.fromEntries(formData);

    const res = await fetch("/api/flow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        phone: userPhone,
        step: "payment",
        payload
      })
    });

    const data = await res.json();

    statusText.innerText = data.message;

    currentStep = data.next;
    showStep(data.next);
  });
