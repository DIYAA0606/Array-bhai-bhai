// Stock data
const fakeStockInfo = {
  "SBI": { price: 805.15, volume: "3,955,677", description: "State Bank of India is the country’s largest public sector bank.", sector: "Banking", pe: 14.8, dividend: "2.1%" },
  "ITC": { price: 412.00, volume: "8,495,104", description: "ITC Limited is a conglomerate...", sector: "FMCG", pe: 29.5, dividend: "3.4%" },
  "TCS": { price: 3830.10, volume: "2,784,221", description: "Tata Consultancy Services is a global IT services company...", sector: "IT", pe: 28.1, dividend: "1.6%" },
  "RELIANCE": { price: 2765.20, volume: "6,110,441", description: "Reliance Industries is involved in energy, retail, digital...", sector: "Conglomerate", pe: 24.3, dividend: "0.3%" },
  "INFOSYS": { price: 1480.50, volume: "3,251,110", description: "Infosys provides IT consulting...", sector: "IT", pe: 25.9, dividend: "2.0%" }
};

const topStocks = [
  { name: "RELIANCE", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "INFOSYS", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" }
];

function normalize(str) {
  return str.trim().toUpperCase();
}

// DOM Elements
const stockInput = document.getElementById('stockInput');
const suggestionBox = document.getElementById('suggestionBox');
const stockInfo = document.getElementById('stockInfo');
const wishlistPreview = document.getElementById('wishlistPreview');
const wishlistButton = document.getElementById('wishlistButton');
const trackButton = document.getElementById('trackButton');
const darkModeToggle = document.getElementById('darkModeToggle');

// Use this key everywhere for sync
const WATCHLIST_STORAGE_KEY = "bullup_watchlist";

// Initialize wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];

// Expose globally for tools page and others
window.fakeStockInfo = fakeStockInfo;
window.wishlist = wishlist;

// Render Top Stocks Table
function renderTopStocks() {
  const tbody = document.getElementById('topStocksBody');
  tbody.innerHTML = '';
  topStocks.forEach(stock => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${stock.name}</td>
      <td>₹${stock.price}</td>
      <td style="color:${stock.change.startsWith('+') ? 'green' : 'red'}">${stock.change}</td>
      <td>${stock.marketCap}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Watchlist Preview with remove buttons
function renderWishlistPreview() {
  wishlistPreview.innerHTML = '';
  if (wishlist.length === 0) {
    wishlistPreview.innerHTML = '<li>No stocks added yet.</li>';
    return;
  }
  wishlist.forEach(stock => {
    const li = document.createElement('li');
    li.style.position = 'relative';
    li.style.paddingRight = '25px';
    li.textContent = stock;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.title = `Remove ${stock} from Watchlist`;
    removeBtn.style.position = 'absolute';
    removeBtn.style.right = '5px';
    removeBtn.style.top = '50%';
    removeBtn.style.transform = 'translateY(-50%)';
    removeBtn.style.border = 'none';
    removeBtn.style.background = 'transparent';
    removeBtn.style.color = 'red';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.fontWeight = 'bold';
    removeBtn.style.fontSize = '14px';

    removeBtn.onclick = () => {
      wishlist = wishlist.filter(s => s !== stock);
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      window.wishlist = wishlist; // Update global
      renderWishlistPreview();
      alert(`${stock} removed from your Watchlist.`);
    };

    li.appendChild(removeBtn);
    wishlistPreview.appendChild(li);
  });
}

// Track stock info display
function trackStock() {
  const key = normalize(stockInput.value);
  const info = fakeStockInfo[key];
  if (info) {
    stockInfo.innerHTML = `
      <h3>${key}</h3>
      <p><strong>Price:</strong> ₹${info.price}</p>
      <p><strong>Volume:</strong> ${info.volume}</p>
      <p><strong>Sector:</strong> ${info.sector}</p>
      <p><strong>P/E Ratio:</strong> ${info.pe}</p>
      <p><strong>Dividend Yield:</strong> ${info.dividend}</p>
      <p>${info.description}</p>
    `;
  } else {
    stockInfo.innerHTML = `<p style="color: red;">Stock not found. Please enter a valid stock symbol.</p>`;
  }
}

// Add stock to wishlist
function addToWishlist() {
  const key = normalize(stockInput.value);
  if (fakeStockInfo[key]) {
    if (!wishlist.includes(key)) {
      wishlist.push(key);
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      window.wishlist = wishlist; // Update global
      renderWishlistPreview();
      alert(`${key} added to your Watchlist!`);
    } else {
      alert(`${key} is already in your Watchlist.`);
    }
  } else {
    alert('Please enter a valid stock symbol to add.');
  }
}

// Autocomplete suggestions on input
stockInput.addEventListener('input', () => {
  const input = normalize(stockInput.value);
  suggestionBox.innerHTML = "";
  if (!input) {
    suggestionBox.style.display = 'none';
    return;
  }
  const matches = Object.keys(fakeStockInfo).filter(s => s.includes(input));
  matches.forEach(s => {
    const div = document.createElement('div');
    div.textContent = s;
    div.addEventListener('click', () => {
      stockInput.value = s;
      suggestionBox.style.display = 'none';
      trackStock();
    });
    suggestionBox.appendChild(div);
  });
  suggestionBox.style.display = matches.length ? 'block' : 'none';
});

// Hide suggestion box on outside click
document.addEventListener('click', e => {
  if (!suggestionBox.contains(e.target) && e.target !== stockInput) {
    suggestionBox.style.display = 'none';
  }
});

// Button actions
trackButton.addEventListener('click', trackStock);
wishlistButton.addEventListener('click', addToWishlist);
stockInput.addEventListener('keypress', e => { if (e.key === 'Enter') trackStock(); });

// Dark mode toggle and persistence
darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
});

window.onload = () => {
  renderTopStocks();
  renderWishlistPreview();
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
};

