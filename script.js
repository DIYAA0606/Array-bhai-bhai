const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is the country’s largest public sector bank and financial services company.",
    sector: "Banking"
  },
  "ITC": {
    price: 412.00,
    volume: "8,495,104",
    description: "ITC Limited is a conglomerate with diversified businesses including FMCG, cigarettes, hotels, packaging, and more.",
    sector: "Consumer Goods"
  },
  "Bajaj Finance": {
    price: 876.65,
    volume: "2,483,494",
    description: "Bajaj Finance Ltd is a major NBFC engaged in consumer and SME lending.",
    sector: "Financial Services"
  }
};

function trackStock() {
  const raw = document.getElementById("stockInput").value.trim().toLowerCase();
  const out = document.getElementById("stockData");

  if (!raw) {
    out.innerHTML = "⚠️ Please enter a stock name.";
    return;
  }

  let match = null;
  const cleanInput = raw.replace(/[^a-z0-9]/gi, "");

  for (const name in fakeStockInfo) {
    const cleanname = name.toLowerCase().replace(/[^a-z0-9]/gi, "");
    if (cleanname.includes(cleanInput)) {
      match = name;
      break;
    }
  }

  if (match) {
    const s = fakeStockInfo[match];
    out.innerHTML = `
      📊 <strong>${match}</strong><br>
      💵 Price: ₹${s.price}<br>
      📦 Volume: ${s.volume}<br>
      🏭 Sector: ${s.sector}<br>
      📝 About: ${s.description}
    `;
  } else {
    out.innerHTML = `❌ Sorry, "${raw}" not found in database.`;
  }

  document.getElementById("stockInput").value = "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function displayAvailableStocks() {
  document.getElementById("stockList").innerText =
    `📦 Available: ${Object.keys(fakeStockInfo).join(', ')}`;
}

// Init on page load
window.onload = () => {
  displayAvailableStocks();
  document.getElementById("stockInput").focus();
};

// Trigger on Enter key
document.getElementById("stockInput").addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "enter") {
    trackStock();
  }
});
const stockInput = document.getElementById("stockInput");
const suggestionBox = document.getElementById("suggestions");

// Filter suggestions as the user types
stockInput.addEventListener("input", () => {
  const input = stockInput.value.trim().toLowerCase();
  suggestionBox.innerHTML = "";

  if (!input) return;

  const matches = Object.keys(fakeStockInfo).filter(name =>
    name.toLowerCase().includes(input)
  );

  matches.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    li.onclick = () => {
      stockInput.value = name;
      suggestionBox.innerHTML = "";
      trackStock(); // Optional: auto-track when selected
    };
    suggestionBox.appendChild(li);
  });
});

// Hide suggestions on outside click
document.addEventListener("click", (e) => {
  if (e.target !== stockInput) {
    suggestionBox.innerHTML = "";
  }
});

