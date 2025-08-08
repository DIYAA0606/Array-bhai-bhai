const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is the country’s largest public sector bank providing a wide range of financial products and services.",
    sector: "Banking",
    peRatio: 18.5,
    dividendYield: "1.45%"
  },
  "ITC": {
    price: 412.00,
    volume: "8,495,104",
    description: "ITC Limited is a diversified conglomerate with strong presence in FMCG, hotels, paperboards, and packaging.",
    sector: "FMCG",
    peRatio: 25.2,
    dividendYield: "2.1%"
  },
  "TCS": {
    price: 3830.10,
    volume: "2,784,221",
    description: "Tata Consultancy Services is a global leader in IT services, consulting, and business solutions.",
    sector: "IT",
    peRatio: 32.4,
    dividendYield: "1.1%"
  },
  "Reliance": {
    price: 2765.20,
    volume: "6,110,441",
    description: "Reliance Industries Limited operates across energy, petrochemicals, textiles, retail, and telecommunications.",
    sector: "Conglomerate",
    peRatio: 28.7,
    dividendYield: "0.8%"
  },
  "Infosys": {
    price: 1480.50,
    volume: "3,251,110",
    description: "Infosys is a multinational corporation that provides business consulting, IT, and outsourcing services.",
    sector: "IT",
    peRatio: 30.1,
    dividendYield: "1.7%"
  },
  "HDFC": {
    price: 1580.00,
    volume: "2,149,332",
    description: "HDFC Bank is one of India's premier private sector banks known for its excellent customer service.",
    sector: "Banking",
    peRatio: 22.6,
    dividendYield: "1.3%"
  },
  "ICICI": {
    price: 1455.00,
    volume: "3,500,000",
    description: "ICICI Bank offers comprehensive banking products and services for retail and corporate customers.",
    sector: "Banking",
    peRatio: 20.9,
    dividendYield: "1.5%"
  },
  "Larsen & Toubro": {
    price: 1650.50,
    volume: "1,200,000",
    description: "Larsen & Toubro is a major technology, engineering, construction, and manufacturing company.",
    sector: "Infrastructure",
    peRatio: 15.8,
    dividendYield: "1.0%"
  },
  "Maruti": {
    price: 7300.75,
    volume: "500,000",
    description: "Maruti Suzuki is India's largest automobile manufacturer, producing a wide range of cars.",
    sector: "Automobile",
    peRatio: 35.5,
    dividendYield: "0.6%"
  },
  "Axis Bank": {
    price: 740.10,
    volume: "2,800,000",
    description: "Axis Bank is a leading private sector bank offering financial services to individuals and businesses.",
    sector: "Banking",
    peRatio: 19.2,
    dividendYield: "1.2%"
  },
  "Wipro": {
    price: 620.30,
    volume: "1,900,000",
    description: "Wipro Limited is a global information technology, consulting, and business process services company.",
    sector: "IT",
    peRatio: 28.4,
    dividendYield: "1.4%"
  },
  "Bajaj Finance": {
    price: 6700.50,
    volume: "900,000",
    description: "Bajaj Finance is one of India's leading non-banking financial companies (NBFCs).",
    sector: "Financial Services",
    peRatio: 42.3,
    dividendYield: "0.5%"
  },
  "Tata Steel": {
    price: 1120.75,
    volume: "1,400,000",
    description: "Tata Steel is a major steel manufacturing company with global operations.",
    sector: "Metals & Mining",
    peRatio: 12.7,
    dividendYield: "1.8%"
  },
  "Hindustan Unilever": {
    price: 2300.40,
    volume: "2,000,000",
    description: "Hindustan Unilever is a leader in the FMCG sector with a wide range of consumer products.",
    sector: "FMCG",
    peRatio: 27.8,
    dividendYield: "1.9%"
  },
  "Adani Enterprises": {
    price: 1455.30,
    volume: "1,600,000",
    description: "Adani Enterprises operates across sectors including energy, resources, logistics, and more.",
    sector: "Conglomerate",
    peRatio: 16.4,
    dividendYield: "0.7%"
  }
};

const topStocks = [
  { company: "Reliance", price: 2765.20, change: "+1.2%", marketCap: "₹15T" },
  { company: "TCS", price: 3830.10, change: "-0.5%", marketCap: "₹12T" },
  { company: "HDFC", price: 1580.00, change: "+0.8%", marketCap: "₹9T" },
  { company: "Infosys", price: 1480.50, change: "+0.3%", marketCap: "₹8T" },
  { company: "ITC", price: 412.00, change: "-0.1%", marketCap: "₹4T" }
];

const watchlist = [];

const stockInput = document.getElementById("stockInput");
const trackButton = document.getElementById("trackButton");
const addToWatchlistButton = document.getElementById("addToWatchlist");
const stockInfoDiv = document.getElementById("stockInfo");
const watchlistUl = document.getElementById("watchlist");
const topStocksTableBody = document.querySelector("#topStocksTable tbody");
const darkModeToggle = document.getElementById("darkModeToggle");

// Show stock info with emojis
function showStockInfo() {
  const input = stockInput.value.trim();
  const info = fakeStockInfo[input];
  if (info) {
    stockInfoDiv.innerHTML = `
      <h3>📈 ${input} - ₹${info.price}</h3>
      <p><strong>💰 Price:</strong> ₹${info.price}</p>
      <p><strong>🔊 Volume:</strong> ${info.volume}</p>
      <p><strong>🏷️ Sector:</strong> ${info.sector}</p>
      <p><strong>📊 P/E Ratio:</strong> ${info.peRatio}</p>
      <p><strong>💵 Dividend Yield:</strong> ${info.dividendYield}</p>
      <p>📝 ${info.description}</p>
      <p>⭐ Add this stock to your watchlist for easy tracking!</p>
    `;
  } else {
    stockInfoDiv.innerHTML = "<p style='color:red'>❌ Stock not found. Please select a valid company from the list.</p>";
  }
}

function renderTopStocks() {
  topStocksTableBody.innerHTML = "";
  topStocks.forEach(stock => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>📊 ${stock.company}</td>
      <td>💰 ₹${stock.price}</td>
      <td>${stock.change}</td>
      <td>🏦 ${stock.marketCap}</td>
    `;
    topStocksTableBody.appendChild(row);
  });
}

function renderWatchlist() {
  watchlistUl.innerHTML = "";
  watchlist.forEach((stock, index) => {
    const li = document.createElement("li");
    li.textContent = `⭐ ${stock}`;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("remove-btn");
    removeBtn.title = "Remove from watchlist";
    removeBtn.onclick = () => {
      watchlist.splice(index, 1);
      renderWatchlist();
    };
    li.appendChild(removeBtn);
    watchlistUl.appendChild(li);
  });
}

// Button handlers
trackButton.addEventListener("click", () => {
  showStockInfo();
});

addToWatchlistButton.addEventListener("click", () => {
  const stockName = stockInput.value.trim();
  if (stockName && fakeStockInfo[stockName]) {
    if (!watchlist.includes(stockName)) {
      watchlist.push(stockName);
      renderWatchlist();
    } else {
      alert("⚠️ Stock already in watchlist!");
    }
  } else {
    alert("❌ Please enter a valid stock name from the list.");
  }
});

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});

// Initial render
renderTopStocks();
renderWatchlist();




