const fakeStockInfo = {
  "RELIANCE": { price: 2765.20, volume: "6,110,441", description: "Reliance Industries - Energy, retail, digital.", sector: "Conglomerate", pe: 24.3, dividend: "0.3%" },
  "TCS": { price: 3830.10, volume: "2,784,221", description: "Tata Consultancy Services - IT services.", sector: "IT", pe: 28.1, dividend: "1.6%" },
  "INFOSYS": { price: 1480.50, volume: "3,251,110", description: "Infosys - IT consulting.", sector: "IT", pe: 25.9, dividend: "2.0%" },
  "SBI": { price: 805.15, volume: "3,955,677", description: "State Bank of India - Public sector bank.", sector: "Banking", pe: 14.8, dividend: "2.1%" },
  "ITC": { price: 412.00, volume: "8,495,104", description: "ITC Limited - FMCG & hospitality.", sector: "FMCG", pe: 29.5, dividend: "3.4%" },

  "HDFCBANK": { price: 1700.00, volume: "1,200,300", description: "HDFC Bank - Private sector bank.", sector: "Banking", pe: 18.5, dividend: "0.9%" },
  "ICICIBANK": { price: 980.50, volume: "4,000,100", description: "ICICI Bank - Banking & financial services.", sector: "Banking", pe: 16.2, dividend: "0.8%" },
  "LT": { price: 3800.00, volume: "1,100,200", description: "Larsen & Toubro - Engineering & construction.", sector: "Infrastructure", pe: 22.7, dividend: "0.4%" },
  "BHARTIARTL": { price: 910.25, volume: "6,500,000", description: "Bharti Airtel - Telecom operator.", sector: "Telecom", pe: 43.2, dividend: "0.2%" },
  "KOTAKBANK": { price: 2200.60, volume: "850,000", description: "Kotak Mahindra Bank - Private sector bank.", sector: "Banking", pe: 21.1, dividend: "0.6%" }
};

// Top stocks array (for table rendering)
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

const WATCHLIST_STORAGE_KEY = "bullup_watchlist";
let wishlist = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];

window.fakeStockInfo = fakeStockInfo;
window.wishlist = wishlist;

// --------------------
// Render Top Stocks Table
// --------------------
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

// --------------------
// Render Wishlist Preview
// --------------------
function renderWishlistPreview() {
  wishlistPreview.innerHTML = '';
  if (wishlist.length === 0) {
    wishlistPreview.innerHTML = '<li>No stocks added yet.</li>';
    return;
  }
  wishlist.forEach(stock => {
    const li = document.createElement('li');
    li.style.paddingRight = '25px';
    li.textContent = stock;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.title = `Remove ${stock} from Watchlist`;

    removeBtn.onclick = () => {
      wishlist = wishlist.filter(s => s !== stock);
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      window.wishlist = wishlist;
      renderWishlistPreview();
      alert(`${stock} removed from your Watchlist.`);
      // notify other page tabs
      localStorage.setItem('bullup_watchlist_update_ts', Date.now());
    };

    li.appendChild(removeBtn);
    wishlistPreview.appendChild(li);
  });
}

// --------------------
// Chart helpers (mini charts for detail and indexes)
// --------------------
function generateFakePrices(base) {
  // simple random walk for 7 points
  let prices = [];
  let price = base;
  for (let i = 6; i >= 0; i--) {
    price = price + (Math.random() - 0.5) * (price * 0.02);
    prices.unshift(Number(price.toFixed(2)));
  }
  return prices;
}

function createLineChart(ctx, labels, data, options = {}) {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: options.label || '',
        data,
        fill: false,
        tension: 0.3,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: options.showLegend || false } },
      scales: { y: { beginAtZero: false } }
    }
  });
}

// --------------------
// Track stock details + mini chart
// --------------------
let activeDetailChart = null;
function trackStock() {
  const key = normalize(stockInput.value);
  const info = fakeStockInfo[key];
  if (info) {
    // build detail section with mini chart
    stockInfo.innerHTML = `
      <div class="stock-detail">
        <div class="detail-text">
          <h3>${key}</h3>
          <p><strong>Price:</strong> ₹${info.price.toLocaleString()}</p>
          <p><strong>Volume:</strong> ${info.volume}</p>
          <p><strong>Sector:</strong> ${info.sector}</p>
          <p><strong>P/E Ratio:</strong> ${info.pe}</p>
          <p><strong>Dividend Yield:</strong> ${info.dividend}</p>
          <p>${info.description}</p>
          <div style="margin-top:12px;">
            <button id="addToWLInline" style="margin-right:8px; padding:8px 12px; border-radius:6px; border:none; background:#2e7d32; color:white; cursor:pointer;">Add to Watchlist</button>
            <button id="openTools" style="padding:8px 12px; border-radius:6px; border:none; background:#2196f3; color:white; cursor:pointer;">Open Tools (Charts)</button>
          </div>
        </div>
        <div class="detail-chart">
          <canvas id="stockMiniChart" width="300" height="170"></canvas>
        </div>
      </div>
    `;

    // add handlers
    document.getElementById('addToWLInline').addEventListener('click', () => {
      addToWishlistFromSymbol(key);
    });
    document.getElementById('openTools').addEventListener('click', () => {
      window.location.href = 'tools.html';
    });

    // render mini chart
    const base = info.price || 1000;
    const prices = generateFakePrices(base);
    const labels = ['6d','5d','4d','3d','2d','1d','Today'];
    const ctx = document.getElementById('stockMiniChart').getContext('2d');
    if (activeDetailChart) activeDetailChart.destroy();
    activeDetailChart = createLineChart(ctx, labels, prices, { label: key, showLegend: false });
  } else {
    stockInfo.innerHTML = `<p style="color: red;">Stock not found. Please enter a valid stock symbol.</p>`;
  }
}

// --------------------
// Add to wishlist (button)
function addToWishlist() {
  const key = normalize(stockInput.value);
  addToWishlistFromSymbol(key);
}

function addToWishlistFromSymbol(key) {
  if (fakeStockInfo[key]) {
    if (!wishlist.includes(key)) {
      wishlist.push(key);
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      window.wishlist = wishlist;
      renderWishlistPreview();
      alert(`${key} added to your Watchlist!`);
      localStorage.setItem('bullup_watchlist_update_ts', Date.now());
    } else {
      alert(`${key} is already in your Watchlist.`);
    }
  } else {
    alert('Please enter a valid stock symbol to add.');
  }
}

// --------------------
// Autocomplete suggestions
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

// --------------------
// Index & Tools charts (Sensex / Nifty) - simulated data now
let sensexChart = null;
let niftyChart = null;

// Simple rendering of index cards (below top stocks)
function renderIndexCards() {
  // Placeholder values. Replace with live fetch if you wire an API.
  const niftyVal = 18230.30;   // placeholder
  const niftyPct = "+0.62%";   // placeholder
  const sensexVal = 61500.45;  // placeholder
  const sensexPct = "+0.58%";  // placeholder

  document.getElementById('niftyValue').textContent = `₹ ${niftyVal.toLocaleString()}`;
  document.getElementById('niftyChange').textContent = `${niftyPct}`;
  document.getElementById('sensexValue').textContent = `₹ ${sensexVal.toLocaleString()}`;
  document.getElementById('sensexChange').textContent = `${sensexPct}`;

  // colorize
  document.getElementById('niftyChange').style.color = niftyPct.startsWith('+') ? 'green' : 'red';
  document.getElementById('sensexChange').style.color = sensexPct.startsWith('+') ? 'green' : 'red';
}

// --------------------
// Initialize page
window.onload = () => {
  renderTopStocks();
  renderWishlistPreview();
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
  }
  renderIndexCards();
};

// --------------------
// Allow other tabs to trigger chart updates (storage event)
window.addEventListener('storage', (e) => {
  if (e.key === 'bullup_watchlist_update_ts') {
    // some other tab updated the watchlist
    wishlist = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];
    window.wishlist = wishlist;
    renderWishlistPreview();
  }
});

// --------------------
// Hooks for future real-time API integration
// Example (commented):
/*
async function fetchLivePrices(symbols) {
  // Use a real finance API (Alpha Vantage, Yahoo Finance, Twelve Data, etc.)
  // and update fakeStockInfo[symbol].price with the fetched price.
  // After updating, call renderTopStocks(), renderIndexCards(), etc.
}
*/
