const fakeStockInfo = {
"SBI": { price: 805.15, volume: "3,955,677", description: "State Bank of India is the country’s largest public sector bank.", sector: "Banking", pe: 14.8, dividend: "2.1%" },
"ITC": { price: 412.00, volume: "8,495,104", description: "ITC Limited is a conglomerate with FMCG, cigarettes, hotels, paperboards, and more.", sector: "FMCG", pe: 29.5, dividend: "3.4%" },
"TCS": { price: 3830.10, volume: "2,784,221", description: "Tata Consultancy Services is a global IT services company offering consulting and business solutions.", sector: "IT", pe: 28.1, dividend: "1.6%" },
"Reliance": { price: 2765.20, volume: "6,110,441", description: "Reliance Industries is involved in energy, petrochemicals, textiles, retail, and digital services.", sector: "Conglomerate", pe: 24.3, dividend: "0.3%" },
"Infosys": { price: 1480.50, volume: "3,251,110", description: "Infosys provides IT consulting, digital transformation, and business outsourcing.", sector: "IT", pe: 25.9, dividend: "2.0%" },
"HDFC": { price: 1580.00, volume: "2,149,332", description: "HDFC Bank offers retail, corporate banking, and treasury operations services.", sector: "Banking", pe: 21.7, dividend: "1.1%" },
"ICICI": { price: 1455.00, volume: "3,500,000", description: "ICICI Bank offers a wide range of financial products and banking services.", sector: "Banking", pe: 19.5, dividend: "1.0%" },
"Adani": { price: 2995.50, volume: "4,120,000", description: "Adani Enterprises operates in energy, ports, logistics, and infrastructure.", sector: "Infrastructure", pe: 34.2, dividend: "0.4%" },
"Wipro": { price: 475.30, volume: "1,800,000", description: "Wipro is a leading IT services company specializing in consulting and outsourcing.", sector: "IT", pe: 18.6, dividend: "1.9%" },
"HCL": { price: 1720.90, volume: "2,050,000", description: "HCL Technologies delivers IT services, enterprise transformation, and engineering solutions.", sector: "IT", pe: 20.4, dividend: "2.5%" },
"Maruti": { price: 9650.00, volume: "1,300,000", description: "Maruti Suzuki India Limited is the country’s largest passenger car manufacturer.", sector: "Automobile", pe: 31.8, dividend: "1.2%" },
"Axis": { price: 1150.75, volume: "2,600,000", description: "Axis Bank provides financial services to large, mid-size corporates, and retail businesses.", sector: "Banking", pe: 20.1, dividend: "0.9%" }
};

const topStocks = [
{ name: "Reliance", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
{ name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
{ name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
{ name: "Infosys", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" },
{ name: "ICICI", price: "1,455.00", change: "+0.10%", marketCap: "₹10.5L Cr" }
];

let wishlist = [];

// Render top stocks table
function renderTopStocksTable() {
const tbody = document.querySelector("#topStocksTable tbody");
if (!tbody) return;
tbody.innerHTML = "";
topStocks.forEach(stock => {
const row = document.createElement("tr");
row.innerHTML = <td>${stock.name}</td> <td>${stock.price}</td> <td>${stock.change}</td> <td>${stock.marketCap}</td> ;
tbody.appendChild(row);
});
}

// Wishlist UI
function updateWishlist() {
const list = document.getElementById("wishlist");
if (!list) return;
list.innerHTML = "";
wishlist.forEach(item => {
const li = document.createElement("li");
li.innerHTML = ${item} <button type="button" data-stock="${item}" class="remove-btn">✖</button> ;
list.appendChild(li);
});
list.querySelectorAll(".remove-btn").forEach(btn => {
btn.addEventListener("click", () => {
removeFromWishlist(btn.getAttribute("data-stock"));
});
});
}

function addToWishlist() {
const stockInput = document.getElementById("stockInput");
if (!stockInput) return;
const stock = stockInput.value.trim().toUpperCase();
if (fakeStockInfo[stock] && !wishlist.includes(stock)) {
wishlist.push(stock);
updateWishlist();
}
}

function removeFromWishlist(stock) {
wishlist = wishlist.filter(item => item !== stock);
updateWishlist();
}

// Tracking display
function trackStock() {
const stockInput = document.getElementById("stockInput");
const display = document.getElementById("stockInfo");
if (!stockInput || !display) return;

const input = stockInput.value.trim().toUpperCase();
const info = fakeStockInfo[input];

if (info) {
display.innerHTML = <h3>${input}</h3> <p><strong>Price:</strong> ₹${info.price}</p> <p><strong>Volume:</strong> ${info.volume}</p> <p><strong>Sector:</strong> ${info.sector}</p> <p><strong>P/E Ratio:</strong> ${info.pe}</p> <p><strong>Dividend Yield:</strong> ${info.dividend}</p> <p>${info.description}</p> ;
} else {
display.innerHTML = <p>Stock not found. Please enter a valid stock symbol.</p>;
}
}

// Dark mode
function toggleDarkMode() {
document.body.classList.toggle("dark-mode");
}

// Init after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
const suggestionsBox = document.getElementById("suggestions");
const stockInput = document.getElementById("stockInput");
const trackBtn = document.getElementById("trackButton");
const wishlistBtn = document.getElementById("wishlistButton");
const darkModeToggle = document.getElementById("darkModeToggle");

if (trackBtn) trackBtn.addEventListener("click", trackStock);
if (wishlistBtn) wishlistBtn.addEventListener("click", addToWishlist);
if (darkModeToggle) darkModeToggle.addEventListener("click", toggleDarkMode);

// Autocomplete
if (stockInput && suggestionsBox) {
const stockNames = Object.keys(fakeStockInfo);
stockInput.addEventListener("input", function () {
  const value = this.value.trim().toUpperCase();
  suggestionsBox.innerHTML = "";

  if (!value) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = stockNames.filter(name => name.includes(value));
  if (matches.length > 0) {
    matches.forEach(stock => {
      const div = document.createElement("div");
      div.textContent = stock;
      div.addEventListener("click", () => {
        stockInput.value = stock;
        suggestionsBox.style.display = "none";
        trackStock();
      });
      suggestionsBox.appendChild(div);
    });
    suggestionsBox.style.display = "block";
  } else {
    suggestionsBox.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== stockInput) {
    suggestionsBox.style.display = "none";
  }
});

stockInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    trackStock();
  }
});
}

renderTopStocksTable();
updateWishlist();
});
