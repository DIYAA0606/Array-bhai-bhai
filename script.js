const fakeStockInfo = {
  "SBI": { price: 805.15, volume: "3,955,677", description: "State Bank of India is the country’s largest public sector bank.", sector: "Banking", pe: 14.8, dividend: "2.1%" },
  "ITC": { price: 412.00, volume: "8,495,104", description: "ITC Limited is a conglomerate...", sector: "FMCG", pe: 29.5, dividend: "3.4%" },
  "TCS": { price: 3830.10, volume: "2,784,221", description: "Tata Consultancy Services is a global IT services company...", sector: "IT", pe: 28.1, dividend: "1.6%" },
  "Reliance": { price: 2765.20, volume: "6,110,441", description: "Reliance Industries is involved in energy, retail, digital...", sector: "Conglomerate", pe: 24.3, dividend: "0.3%" },
  "Infosys": { price: 1480.50, volume: "3,251,110", description: "Infosys provides IT consulting...", sector: "IT", pe: 25.9, dividend: "2.0%" }
};

const topStocks = [
  { name: "Reliance", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "Infosys", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" }
];

let wishlist = [];

function renderTopStocksTable() {
  const tbody = document.getElementById("topStocksBody");
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

function updateWishlist() {
  const list = document.getElementById("wishlist");
  list.innerHTML = "";
  wishlist.forEach(stock => {
    const li = document.createElement("li");
    li.innerHTML = `${stock} <button onclick="removeFromWishlist('${stock}')">✖</button>`;
    list.appendChild(li);
  });
}

function addToWishlist() {
  const stock = document.getElementById("stockInput").value.trim().toUpperCase();
  if (fakeStockInfo[stock] && !wishlist.includes(stock)) {
    wishlist.push(stock);
    updateWishlist();
  }
}

function removeFromWishlist(stock) {
  wishlist = wishlist.filter(item => item !== stock);
  updateWishlist();
}

function trackStock() {
  const stock = document.getElementById("stockInput").value.trim().toUpperCase();
  const info = fakeStockInfo[stock];
  const display = document.getElementById("stockInfo");
  if (info) {
    display.innerHTML = `
      <h3>${stock}</h3>
      <p><strong>Price:</strong> ₹${info.price}</p>
      <p><strong>Volume:</strong> ${info.volume}</p>
      <p><strong>Sector:</strong> ${info.sector}</p>
      <p><strong>P/E Ratio:</strong> ${info.pe}</p>
      <p><strong>Dividend Yield:</strong> ${info.dividend}</p>
      <p>${info.description}</p>
    `;
  } else {
    display.innerHTML = `<p>Stock not found. Please enter a valid stock symbol.</p>`;
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Autocomplete
const stockInput = document.getElementById("stockInput");
const suggestionsBox = document.getElementById("suggestionBox");
const stockNames = Object.keys(fakeStockInfo);

stockInput.addEventListener("input", () => {
  const input = stockInput.value.trim().toUpperCase();
  suggestionsBox.innerHTML = "";

  if (!input) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = stockNames.filter(name => name.includes(input));
  matches.forEach(name => {
    const div = document.createElement("div");
    div.textContent = name;
    div.addEventListener("click", () => {
      stockInput.value = name;
      suggestionsBox.style.display = "none";
      trackStock();
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = matches.length > 0 ? "block" : "none";
});

document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== stockInput) {
    suggestionsBox.style.display = "none";
  }
});

// Listeners
document.getElementById("trackButton").addEventListener("click", trackStock);
document.getElementById("wishlistButton").addEventListener("click", addToWishlist);
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);
stockInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    trackStock();
  }
});

// Init
window.onload = () => {
  renderTopStocksTable();
  updateWishlist();
};
