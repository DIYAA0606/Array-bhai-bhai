const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is the country’s largest public sector bank.",
    sector: "Banking"
  },
  "ITC": {
    price: 412.00,
    volume: "8,495,104",
    description: "ITC Limited is a conglomerate with FMCG, cigarettes, and more.",
    sector: "Consumer Goods"
  },
  "Bajaj Finance": {
    price: 876.65,
    volume: "2,483,494",
    description: "Bajaj Finance Ltd is a major NBFC in consumer and SME lending.",
    sector: "Financial Services"
  }
};

const sectorColors = {
  "Banking": "#1f77b4",
  "Consumer Goods": "#ff7f0e",
  "Financial Services": "#2ca02c"
};

window.onload = () => {
  const stockInput = document.getElementById("stockInput");
  const suggestionBox = document.getElementById("suggestions");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const trackBtn = document.getElementById("trackButton");

  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  function trackStock() {
    const raw = stockInput.value.trim().toLowerCase();
    const out = document.getElementById("stockData");
    const loader = document.getElementById("loader");

    if (!raw) {
      showToast("⚠️ Please enter a stock name.");
      return;
    }

    loader.style.display = "block";
    setTimeout(() => {
      loader.style.display = "none";

      let match = null;
      const cleanInput = raw.replace(/[^a-z0-9]/gi, "");

      for (const name in fakeStockInfo) {
        const cleanName = name.toLowerCase().replace(/[^a-z0-9]/gi, "");
        if (cleanName.includes(cleanInput)) {
          match = name;
          break;
        }
      }

      if (match) {
        const s = fakeStockInfo[match];
        const color = sectorColors[s.sector] || "#000";
        const isUp = Math.random() > 0.5;
        const trend = `<span style="color:${isUp ? 'green' : 'red'}; font-size: 22px;">${isUp ? '📈' : '📉'}</span>`;

        out.innerHTML = `
          ${trend} <strong>${match}</strong><br>
          <span style="color:${color}">🏭 Sector: ${s.sector}</span><br>
          💵 Price: ₹${s.price}<br>
          📦 Volume: ${s.volume}<br>
          📝 About: ${s.description}
        `;
      } else {
        out.innerHTML = `❌ Sorry, "${raw}" not found in database.`;
      }

      stockInput.value = "";
      suggestionBox.innerHTML = "";
    }, 500);
  }

  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  function displayAvailableStocks() {
    document.getElementById("stockList").innerText =
      `📦 Available: ${Object.keys(fakeStockInfo).join(', ')}`;
  }

  stockInput.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "enter") {
      trackStock();
    }
  });

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
        trackStock();
      };
      suggestionBox.appendChild(li);
    });
  });

  document.addEventListener("click", (e) => {
    if (e.target !== stockInput) {
      suggestionBox.innerHTML = "";
    }
  });

  displayAvailableStocks();
  darkModeToggle.addEventListener("click", toggleDarkMode);
  trackBtn.addEventListener("click", trackStock);
};
