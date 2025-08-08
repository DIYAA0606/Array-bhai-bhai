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
    sector: "FMCG"
  },
  "TCS": {
    price: 3830.10,
    volume: "2,784,221",
    description: "Tata Consultancy Services is a global IT services company.",
    sector: "IT"
  },
  "Reliance": {
    price: 2765.20,
    volume: "6,110,441",
    description: "Reliance Industries is a conglomerate involved in energy, petrochemicals, textiles, etc.",
    sector: "Conglomerate"
  },
  "Infosys": {
    price: 1480.50,
    volume: "3,251,110",
    description: "Infosys is a global leader in next-gen digital services and consulting.",
    sector: "IT"
  },
  "HDFC": {
    price: 1580.00,
    volume: "2,149,332",
    description: "HDFC Bank is one of India’s leading private sector banks.",
    sector: "Banking"
  },
  "ICICI": {
    price: 1455.00,
    volume: "3,500,000",
    description: "ICICI Bank offers a wide range of banking products and services.",
    sector: "Banking"
  },
  "HUL": {
    price: 2505.50,
    volume: "1,234,567",
    description: "Hindustan Unilever Limited is a leading FMCG company in India.",
    sector: "FMCG"
  },
  "L&T": {
    price: 2100.75,
    volume: "987,654",
    description: "Larsen & Toubro is a major technology, engineering, construction company.",
    sector: "Infrastructure"
  },
  "Axis Bank": {
    price: 765.30,
    volume: "1,500,000",
    description: "Axis Bank is one of the largest private sector banks in India.",
    sector: "Banking"
  },
  "Bharti Airtel": {
    price: 710.10,
    volume: "2,200,000",
    description: "Bharti Airtel is a global telecommunications company.",
    sector: "Telecom"
  },
  "Maruti Suzuki": {
    price: 8100.45,
    volume: "600,000",
    description: "Maruti Suzuki is India’s largest passenger car manufacturer.",
    sector: "Automobile"
  },
  "Asian Paints": {
    price: 3250.90,
    volume: "900,000",
    description: "Asian Paints is the largest paint company in India.",
    sector: "Consumer Goods"
  },
  "Wipro": {
    price: 480.20,
    volume: "1,200,000",
    description: "Wipro is a global IT consulting and services company.",
    sector: "IT"
  },
  "Tata Steel": {
    price: 1200.00,
    volume: "850,000",
    description: "Tata Steel is one of the world's largest steel manufacturing companies.",
    sector: "Steel"
  }
};

const topStocks = [
  { name: "Reliance", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "Infosys", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" },
  { name: "ICICI", price: "1,455.00", change: "+0.10%", marketCap: "₹10.5L Cr" },
  { name: "HUL", price: "2,505.50", change: "+0.20%", marketCap: "₹5.8L Cr" },
  { name: "L&T", price: "2,100.75", change: "-0.05%", marketCap: "₹3.7L Cr" },
  { name: "Axis Bank", price: "765.30", change: "+0.30%", marketCap: "₹2.9L Cr" },
  { name: "Bharti Airtel", price: "710.10", change: "+0.45%", marketCap: "₹2.3L Cr" },
  { name: "Maruti Suzuki", price: "8,100.45", change: "+0.12%", marketCap: "₹3.4L Cr" },
  { name: "Asian Paints", price: "3,250.90", change: "+0.25%", marketCap: "₹3L Cr" },
  { name: "Wipro", price: "480.20", change: "+0.15%", marketCap: "₹2L Cr" },
  { name: "Tata Steel", price: "1,200.00", change: "-0.10%", marketCap: "₹2.1L Cr" }
];

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
  const info = fakeStockInfo[input];
  const display = document.getElementById("stockInfo");
  if (info) {
    display.innerHTML = `
      <h3>${input}</h3>
      <p><strong>Price:</strong> ₹${info.price}</p>
      <p><strong>Volume:</strong> ${info.volume}</p>
      <p><strong>Sector:</strong> ${info.sector}</p>
      <p>${info.description}</p>
    `;
  } else {
    display.innerHTML = "<p style='color:red'>Stock not found. Please select a valid company from the list.</p>";
  }
}

function addToWatchlist() {
  const input = document.getElementById("stockInput").value.trim();
  const info = fakeStockInfo[input];
  const list = document.getElementById("watchlist");

  if (info) {
    const exists = Array.from(list.children).some(li => li.textContent.includes(input));
    if (!exists) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${input} - ₹${info.price} 
        <button class="remove-btn" title="Remove from watchlist">✖</button>
      `;
      list.appendChild(li);

      li.querySelector("button.remove-btn").addEventListener("click", () => {
        li.remove();
      });
    } else {
      alert("Stock already in watchlist.");
    }
  } else {
    alert("Please enter a valid stock name.");
  }
}

document.getElementById("trackButton").addEventListener("click", showStockInfo);
document.getElementById("stockInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    showStockInfo();
  }
});
document.getElementById("addToWatchlist").addEventListener("click", addToWatchlist);

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.onload = () => {
  renderTopStocksTable();
};



