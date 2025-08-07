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
  }
};

const topStocks = [
  { name: "Reliance", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "Infosys", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" },
  { name: "ICICI", price: "1,455.00", change: "+0.10%", marketCap: "₹10.5L Cr" }
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
  const input = document.getElementById("stockInput").value.toUpperCase();
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
    display.innerHTML = "<p>Stock not found.</p>";
  }
}

document.getElementById("trackButton").addEventListener("click", showStockInfo);
document.getElementById("stockInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    showStockInfo();
  }
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

window.onload = () => {
  renderTopStocksTable();
};
