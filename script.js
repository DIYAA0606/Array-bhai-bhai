// Stock Database (shorter details, more companies)
const fakeStockInfo = {
  "SBI": {
    fullName: "State Bank of India 🏦",
    price: 805.15,
    high52: 842.50,
    low52: 502.10,
    marketCap: "₹7.1L Cr",
    sector: "Banking",
    ceo: "Dinesh Kumar Khara"
  },
  "ITC": {
    fullName: "ITC Limited 🍵",
    price: 412.00,
    high52: 499.00,
    low52: 342.50,
    marketCap: "₹5.1L Cr",
    sector: "FMCG",
    ceo: "Sanjiv Puri"
  },
  "TCS": {
    fullName: "Tata Consultancy Services 💻",
    price: 3830.10,
    high52: 3925.50,
    low52: 3150.00,
    marketCap: "₹14.5L Cr",
    sector: "IT",
    ceo: "K. Krithivasan"
  },
  "Reliance": {
    fullName: "Reliance Industries 🛢️",
    price: 2765.20,
    high52: 2901.40,
    low52: 2250.60,
    marketCap: "₹18.4L Cr",
    sector: "Conglomerate",
    ceo: "Mukesh Ambani"
  },
  "Infosys": {
    fullName: "Infosys Limited 🖥️",
    price: 1480.50,
    high52: 1701.30,
    low52: 1255.00,
    marketCap: "₹6L Cr",
    sector: "IT",
    ceo: "Salil Parekh"
  },
  "HDFC": {
    fullName: "HDFC Bank 🏛️",
    price: 1580.00,
    high52: 1720.80,
    low52: 1370.40,
    marketCap: "₹11.2L Cr",
    sector: "Banking",
    ceo: "Sashidhar Jagdishan"
  },
  "ICICI": {
    fullName: "ICICI Bank 💳",
    price: 1455.00,
    high52: 1552.20,
    low52: 1180.70,
    marketCap: "₹10.5L Cr",
    sector: "Banking",
    ceo: "Sandeep Bakhshi"
  },
  "Wipro": {
    fullName: "Wipro Limited 💡",
    price: 460.50,
    high52: 540.20,
    low52: 370.40,
    marketCap: "₹2.6L Cr",
    sector: "IT",
    ceo: "Thierry Delaporte"
  },
  "Adani": {
    fullName: "Adani Enterprises 🚢",
    price: 2600.00,
    high52: 2850.50,
    low52: 1900.00,
    marketCap: "₹3.2L Cr",
    sector: "Infrastructure",
    ceo: "Gautam Adani"
  },
  "ONGC": {
    fullName: "ONGC 🛢️",
    price: 180.30,
    high52: 200.50,
    low52: 135.00,
    marketCap: "₹2.2L Cr",
    sector: "Energy",
    ceo: "Arun Kumar Singh"
  },
  "HCL": {
    fullName: "HCL Technologies 💻",
    price: 1265.20,
    high52: 1375.40,
    low52: 980.50,
    marketCap: "₹3.4L Cr",
    sector: "IT",
    ceo: "C Vijayakumar"
  },
  "Bajaj": {
    fullName: "Bajaj Finance 💵",
    price: 7000.00,
    high52: 7800.00,
    low52: 5200.00,
    marketCap: "₹4.2L Cr",
    sector: "Finance",
    ceo: "Sanjiv Bajaj"
  },
  "Axis": {
    fullName: "Axis Bank 🏦",
    price: 1100.50,
    high52: 1220.00,
    low52: 900.00,
    marketCap: "₹3.5L Cr",
    sector: "Banking",
    ceo: "Amitabh Chaudhry"
  }
};

// Top Stocks for Table
const topStocks = [
  { name: "Reliance", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "Infosys", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" },
  { name: "ICICI", price: "1,455.00", change: "+0.10%", marketCap: "₹10.5L Cr" }
];

// Render table
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

// Display Stock Info
function displayStockInfo(stockKey) {
  const info = fakeStockInfo[stockKey];
  const display = document.getElementById("stockInfo");

  if (info) {
    display.innerHTML = `
      <div class="stock-card">
        <h3>${info.fullName}</h3>
        <p><strong>💰 Price:</strong> ₹${info.price}</p>
        <p><strong>📈 52W High:</strong> ₹${info.high52} | <strong>📉 Low:</strong> ₹${info.low52}</p>
        <p><strong>💵 Market Cap:</strong> ${info.marketCap}</p>
        <p><strong>📦 Sector:</strong> ${info.sector}</p>
        <p><strong>👨‍💼 CEO:</strong> ${info.ceo}</p>
      </div>
    `;
  } else {
    display.innerHTML = "<p>❌ Stock not found.</p>";
  }
}

// Event Listeners
document.getElementById("trackButton").addEventListener("click", () => {
  const input = document.getElementById("stockInput").value.trim();
  displayStockInfo(input);
});

document.getElementById("stockInput").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    document.getElementById("trackButton").click();
  }
});

document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Load Table
window.onload = () => {
  renderTopStocksTable();
};







