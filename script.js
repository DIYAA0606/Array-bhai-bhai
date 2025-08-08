const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is the country’s largest public sector bank with a vast network. It plays a crucial role in India's economy by providing banking services to millions across urban and rural areas.",
    sector: "Banking",
    peRatio: 12.5,
    dividendYield: "4.5%"
  },
  "ITC": {
    price: 412.0,
    volume: "8,495,104",
    description: "ITC Limited is a conglomerate with FMCG, cigarettes, hotels, and paperboards. It is known for its diversified business model, spanning several key sectors of the economy.",
    sector: "FMCG",
    peRatio: 18.7,
    dividendYield: "2.8%"
  },
  "TCS": {
    price: 3830.1,
    volume: "2,784,221",
    description: "Tata Consultancy Services is a global IT services company operating worldwide. It delivers IT solutions and consulting services to a vast array of industries globally.",
    sector: "IT",
    peRatio: 25.3,
    dividendYield: "1.4%"
  },
  "Reliance": {
    price: 2765.2,
    volume: "6,110,441",
    description: "Reliance Industries is a conglomerate in energy, petrochemicals, telecom, and retail. It is one of India’s most valuable companies with a large presence in multiple sectors.",
    sector: "Conglomerate",
    peRatio: 28.1,
    dividendYield: "0.6%"
  },
  "Infosys": {
    price: 1480.5,
    volume: "3,251,110",
    description: "Infosys is a global leader in digital services and consulting. It supports clients in over 50 countries with technology and innovation-driven solutions.",
    sector: "IT",
    peRatio: 22.0,
    dividendYield: "2.1%"
  },
  "HDFC": {
    price: 1580.0,
    volume: "2,149,332",
    description: "HDFC Bank is one of India’s largest private sector banks. It offers a wide array of financial products and services to individuals and businesses.",
    sector: "Banking",
    peRatio: 18.0,
    dividendYield: "1.9%"
  },
  "ICICI": {
    price: 1455.0,
    volume: "3,500,000",
    description: "ICICI Bank offers a wide range of banking products and services. It emphasizes innovation and customer-centric solutions across India.",
    sector: "Banking",
    peRatio: 16.5,
    dividendYield: "2.3%"
  },
  "HUL": {
    price: 2385.75,
    volume: "1,890,450",
    description: "Hindustan Unilever Limited is a leading FMCG company in India. Its portfolio includes popular brands across food, beverages, personal care, and home care.",
    sector: "FMCG",
    peRatio: 35.2,
    dividendYield: "1.1%"
  },
  "L&T": {
    price: 1725.0,
    volume: "900,000",
    description: "Larsen & Toubro is a major technology, engineering, construction company. It plays a significant role in infrastructure development across India.",
    sector: "Engineering",
    peRatio: 20.4,
    dividendYield: "1.5%"
  },
  "Axis Bank": {
    price: 780.25,
    volume: "2,250,300",
    description: "Axis Bank is a leading private sector bank in India. It offers a broad range of financial services to corporate and retail customers.",
    sector: "Banking",
    peRatio: 15.3,
    dividendYield: "1.8%"
  },
  "Bharti Airtel": {
    price: 630.5,
    volume: "4,100,200",
    description: "Bharti Airtel is one of India’s largest telecom companies. It provides mobile, broadband, and digital TV services to millions of customers.",
    sector: "Telecommunications",
    peRatio: 30.1,
    dividendYield: "0.9%"
  },
  "Maruti Suzuki": {
    price: 7300.0,
    volume: "1,200,000",
    description: "Maruti Suzuki is India’s leading automobile manufacturer. It is known for reliable and affordable vehicles catering to Indian consumers.",
    sector: "Automobile",
    peRatio: 28.6,
    dividendYield: "0.7%"
  },
  "Asian Paints": {
    price: 3300.0,
    volume: "850,000",
    description: "Asian Paints is India’s largest paint company. It offers a wide range of decorative and industrial coatings, trusted by millions of customers.",
    sector: "Manufacturing",
    peRatio: 42.5,
    dividendYield: "0.5%"
  },
  "Wipro": {
    price: 480.0,
    volume: "1,750,000",
    description: "Wipro is a major global IT services company. It provides IT consulting, systems integration, and outsourcing services worldwide.",
    sector: "IT",
    peRatio: 19.7,
    dividendYield: "1.3%"
  },
  "Tata Steel": {
    price: 1100.0,
    volume: "1,100,000",
    description: "Tata Steel is one of the largest steel manufacturing companies in India. It produces high-quality steel products for diverse industries.",
    sector: "Steel",
    peRatio: 8.9,
    dividendYield: "3.2%"
  }
};

const topStocks = [
  { name: "Reliance", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "Infosys", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" },
  { name: "ICICI", price: "1,455.00", change: "+0.10%", marketCap: "₹10.5L Cr" }
];

let watchlist = [];

function renderTopStocksTable() {
  const tbody = document.querySelector("#topStocksTable tbody");
  tbody.innerHTML = "";
  topStocks.forEach(stock => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.name}</td>
      <td>${stock.price}</td>
      <td>${stock.change}</td>
      <td>${stock.marketCap}</td>
    `;
    tbody.appendChild(row);
  });
}

function showStockInfo() {
  const input = document.getElementById("stockInput").value.trim();
  if (!input) return;

  const stockKey = Object.keys(fakeStockInfo).find(
    key => key.toLowerCase() === input.toLowerCase()
  );

  const info = stockKey ? fakeStockInfo[stockKey] : null;
  const display = document.getElementById("stockInfo");

  if (info) {
    display.innerHTML = `
      <h3>📈 ${stockKey}</h3>
      <p>💰 <strong>Price:</strong> ₹${info.price}</p>
      <p>📊 <strong>Volume:</strong> ${info.volume}</p>
      <p>🏢 <strong>Sector:</strong> ${info.sector}</p>
      <p>📐 <strong>P/E Ratio:</strong> ${info.peRatio}</p>
      <p>💸 <strong>Dividend Yield:</strong> ${info.dividendYield}</p>
      <p>📝 <strong>Description:</strong> ${info.description}</p>
    `;
  } else {
    display.innerHTML = `<p>❌ Stock not found.</p>`;
  }
}

function renderWatchlist() {
  const watchlistEl = document.getElementById("watchlist");
  watchlistEl.innerHTML = "";
  if (watchlist.length === 0) {
    watchlistEl.innerHTML = "<p>No stocks in watchlist.</p>";
    return;
  }
  watchlist.forEach(stockName => {
    const li = document.createElement("li");
    li.innerHTML = `
      📝 ${stockName}
      <button class="remove-btn" title="Remove from watchlist" aria-label="Remove ${stockName}">❌</button>
    `;
    li.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromWatchlist(stockName);
    });
    watchlistEl.appendChild(li);
  });
}

function addToWatchlist() {
  const input = document.getElementById("stockInput").value.trim();
  if (!input) return alert("Please enter a stock name.");

  const stockKey = Object.keys(fakeStockInfo).find(
    key => key.toLowerCase() === input.toLowerCase()
  );

  if (!stockKey) {
    alert("Stock not found, cannot add to watchlist.");
    return;
  }

  if (watchlist.includes(stockKey)) {
    alert("Stock already in watchlist.");
    return;
  }

  watchlist.push(stockKey);
  renderWatchlist();
}

function removeFromWatchlist(stockName) {
  watchlist = watchlist.filter(s => s !== stockName);
  renderWatchlist();
}

document.getElementById("trackButton").addEventListener("click", showStockInfo);
document.getElementById("addToWatchlist").addEventListener("click", addToWatchlist);

document.getElementById("stockInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    showStockInfo();
  }
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.onload = () => {
  renderTopStocksTable();
  renderWatchlist();
};







