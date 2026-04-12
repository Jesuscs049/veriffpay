let cards = [];
let deletedCards = [];

const cardInput = document.getElementById("cardInput");
const cardList = document.getElementById("cardList");
const statusText = document.getElementById("status");

// cargar
function load() {
  cards = JSON.parse(localStorage.getItem("cards") || "[]");
  deletedCards = JSON.parse(localStorage.getItem("deleted") || "[]");
  render();
}

function save() {
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("deleted", JSON.stringify(deletedCards));
}

// render
function render() {
  cardList.innerHTML = "";

  cards.forEach((card, i) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      ${card.number.slice(0,6)}****${card.number.slice(-4)}
      <br>
      ${card.expiry} | ${card.status} | intento ${card.attempts}
      <br>
      <button onclick="pay(${i})">PAGAR</button>
    `;

    cardList.appendChild(div);
  });
}

// generar tarjetas
document.getElementById("generateBtn").onclick = () => {
  const lines = cardInput.value.split("\n");

  lines.forEach(line => {
    const p = line.split("|");

    if (p.length >= 2) {
      cards.push({
        number: p[0].trim(),
        expiry: p[1] + "/" + (p[2] || "28"),
        status: "pending",
        attempts: 0
      });
    }
  });

  save();
  render();
  cardInput.value = "";
};

// 🔥 pagar (con backend)
async function pay(index) {
  const card = cards[index];

  statusText.innerText = "Procesando...";

  const res = await fetch("/api/flow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ card })
  });

  const data = await res.json();

  card.attempts++;
  card.status = data.status;

  statusText.innerText = data.message;

  // si pasa → eliminar
  if (data.status === "success") {
    deletedCards.push(card);
    cards.splice(index, 1);
  }

  save();
  render();
}

// 🔁 auto modo
document.getElementById("autoBtn").onclick = async () => {
  for (let i = 0; i < cards.length; i++) {
    await pay(i);
    await new Promise(r => setTimeout(r, 1500));
  }
};

// restore
document.getElementById("restoreBtn").onclick = () => {
  cards = [...deletedCards, ...cards];
  deletedCards = [];
  save();
  render();
};

// delete all
document.getElementById("deleteAllBtn").onclick = () => {
  deletedCards = [...cards, ...deletedCards];
  cards = [];
  save();
  render();
};

load();
