const fakeStockInfo = {
  "Reliance Industries": {
    "price": 1390.85,
    "volume": "642,867",
    "description": "Reliance Industries Limited is a diversified conglomerate operating in oil‑to‑chemicals, refining, petrochemicals, retail, and digital services.",
    "sector": "Diversified / Oil & Gas"
  },
  "Tata Consultancy Services (TCS)": {
    "price": 3047.15,
    "volume": "88,043",
    "description": "Tata Consultancy Services is a global IT services and consulting company, part of the Tata Group.",
    "sector": "Information Technology"
  },
  "HDFC Bank": {
    "price": 1995.40,
    "volume": "267,735",
    "description": "HDFC Bank is one of India's largest private sector banks, offering a full spectrum of banking and financial services.",
    "sector": "Banking"
  },
  "Bharti Airtel": {
    "price": 1924.35,
    "volume": "54,726",
    "description": "Bharti Airtel is a leading telecommunications services provider in India and across several countries in Asia and Africa.",
    "sector": "Telecommunications"
  },
  "ICICI Bank": {
    "price": 1440.05,
    "volume": "229,377",
    "description": "ICICI Bank Limited is a leading private sector bank offering banking, insurance, and investment services.",
    "sector": "Banking"
  },
  "State Bank of India": {
    "price": 805.25,
    "volume": "188,248",
    "description": "State Bank of India is the country’s largest public sector bank.",
    "sector": "Banking"
  },
  "LIC India": {
    "price": "578",
    "volume": "554,212",
    "description": "Life Insurance Corporation of India (LIC) is the country’s largest insurance provider, offering life insurance and investment products.",
    "sector": "Insurance"
  },
  "Infosys": {
    "price": 1437.65,
    "volume": "195,423",
    "description": "Infosys is a global IT services and consulting company headquartered in India.",
    "sector": "Information Technology"
  },
  "Hindustan Unilever (HUL)": {
    "price": 2517.50,
    "volume": "22,229",
    "description": "Hindustan Unilever is a major consumer goods company producing food, personal care, and household products.",
    "sector": "Consumer Goods"
  },
  "ITC Limited": {
    "price": 412.00,
    "volume": "8,495,104",
    "description": "ITC Limited is a conglomerate with FMCG, cigarettes, and more.",
    "sector": "Consumer Goods"
  }
};

window.onload = () => {
  const stockInput = document.getElementById("stockInput");
  const suggestionBox = document.getElementById("suggestions");

  function trackStock() {
    const raw = stockInput.value.trim().toLowerCase();
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

    stockInput.value = "";
    suggestionBox.innerHTML = "";
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
  window.trackStock = trackStock;
  window.toggleDarkMode = toggleDarkMode;
};



