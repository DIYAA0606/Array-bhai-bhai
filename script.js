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
  "KOTAKBANK": { price: 2200.60, volume: "850,000", description: "Kotak Mahindra Bank - Private sector bank.", sector: "Banking", pe: 21.1, dividend: "0.6%" },
  "HDFC": { price: 1580.00, volume: "1,400,000", description: "HDFC Ltd - Housing finance & banking group.", sector: "Financials", pe: 19.2, dividend: "0.7%" },
  "WIPRO": { price: 475.20, volume: "2,200,000", description: "Wipro - IT services.", sector: "IT", pe: 22.4, dividend: "0.5%" },
  "AXISBANK": { price: 840.50, volume: "2,800,000", description: "Axis Bank - Private bank.", sector: "Banking", pe: 17.6, dividend: "0.5%" }
};

const topStocks = [
  { name: "RELIANCE", price: "2,765.20", change: "+0.75%", marketCap: "₹18.4L Cr" },
  { name: "TCS", price: "3,830.10", change: "-0.42%", marketCap: "₹14.5L Cr" },
  { name: "HDFC", price: "1,580.00", change: "+0.60%", marketCap: "₹11.2L Cr" },
  { name: "INFOSYS", price: "1,480.50", change: "+0.13%", marketCap: "₹6L Cr" }
];

//Utilities & DOM refs 
function normalize(s) { return (s || '').toString().trim().toUpperCase(); }

const WATCHLIST_STORAGE_KEY = "bullup_watchlist";
let wishlist = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];

window.fakeStockInfo = fakeStockInfo; // expose

// DOM elements (may be undefined on one page)
const stockInput = document.getElementById('stockInput');
const suggestionBox = document.getElementById('suggestionBox');
const trackButton = document.getElementById('trackButton');
const wishlistButton = document.getElementById('wishlistButton');
const stockInfo = document.getElementById('stockInfo');
const wishlistPreview = document.getElementById('wishlistPreview');
const topStocksBody = document.getElementById('topStocksBody');

// tools page elements
const stockInputTools = document.getElementById('stockInputTools');
const suggestionBoxTools = document.getElementById('suggestionBoxTools');
const fetchInfoBtn = document.getElementById('fetchInfoBtn');
const stockDetails = document.getElementById('stockDetails');

// Render functions
function renderTopStocks() {
  if (!topStocksBody) return;
  topStocksBody.innerHTML = '';
  topStocks.forEach(stock => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${stock.name}</td>
      <td>₹${stock.price}</td>
      <td style="color:${stock.change.startsWith('+') ? 'green' : 'red'}">${stock.change}</td>
      <td>${stock.marketCap}</td>
    `;
    topStocksBody.appendChild(tr);
  });
}

function renderWishlistPreview() {
  if (!wishlistPreview) return;
  wishlistPreview.innerHTML = '';
  if (wishlist.length === 0) {
    wishlistPreview.innerHTML = '<li>No stocks added yet.</li>';
    return;
  }
  wishlist.forEach(stock => {
    const li = document.createElement('li');
    li.textContent = stock;
    li.className = 'wishlist-item';

    // Remove button (hidden by CSS, appears on hover)
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.title = `Remove ${stock}`;
    removeBtn.innerText = '✖';
    removeBtn.onclick = (e) => {
      e.stopPropagation();
      wishlist = wishlist.filter(s => s !== stock);
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(wishlist));
      window.wishlist = wishlist;
      renderWishlistPreview();
      // notify other tabs
      localStorage.setItem('bullup_watchlist_update_ts', Date.now());
    };

    li.appendChild(removeBtn);
    wishlistPreview.appendChild(li);
  });
}

// ------------------ Track & Details ------------------
let activeDetailChart = null;
function showStockDetails(symbol, targetElement) {
  const key = normalize(symbol);
  const info = fakeStockInfo[key];
  const container = typeof targetElement === 'string' ? document.getElementById(targetElement) : targetElement;
  if (!container) return;

  if (info) {
    container.innerHTML = `
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
            <button id="addToWLInline" style="margin-right:8px;">Add to Watchlist</button>
            <button id="openToolsInline">Open Tools (Charts)</button>
          </div>
        </div>
        <div class="detail-chart">
          <canvas id="stockMiniChart" width="300" height="170"></canvas>
        </div>
      </div>
    `;
    const addBtn = document.getElementById('addToWLInline');
    addBtn.addEventListener('click', () => addToWishlistFromKey(key));

    const openBtn = document.getElementById('openToolsInline');
    openBtn.addEventListener('click', () => window.location.href = 'tools.html');

    // draw mini chart (7-point)
    try {
      const base = Number(info.price) || 1000;
      const data = generateFakePrices(base, 7);
      const ctx = document.getElementById('stockMiniChart').getContext('2d');
      if (activeDetailChart) activeDetailChart.destroy();
      activeDetailChart = new Chart(ctx, {
        type: 'line',
        data: { labels: ['6d','5d','4d','3d','2d','1d','Today'], datasets: [{ label: key, data, fill: false, tension: 0.3, pointRadius: 3 }]},
        options: { responsive:true, plugins:{legend:{display:false}}, scales:{ y: { beginAtZero:false } } }
      });
    } catch (err) {
      console.warn('Chart render failed', err);
    }
  } else {
    container.innerHTML = `<p style="color:red;">No data for <strong>${symbol}</strong></p>`;
  }
}

// helper to track from the default home input
function trackStock() {
  if (!stockInput) return;
  showStockDetails(stockInput.value, 'stockInfo');
}

// helper to handle tools page fetch
function fetchInfoTools() {
  if (!stockInputTools) return;
  showStockDetails(stockInputTools.value, 'stockDetails');
}

// ------------------ Watchlist helpers ------------------
function addToWishlistFromKey(key) {
  const k = normalize(key);
  if (!k || !fakeStockInfo[k]) {
    alert('Please enter a valid stock symbol to add.');
    return;
  }
  if (!wishlist.includes(k)) {
    wishlist.push(k);
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    window.wishlist = wishlist;
    renderWishlistPreview();
    alert(`${k} added to your Watchlist!`);
    localStorage.setItem('bullup_watchlist_update_ts', Date.now());
  } else {
    alert(`${k} is already in your Watchlist.`);
  }
}

// add from home input
function addToWishlist() {
  if (!stockInput) return;
  addToWishlistFromKey(stockInput.value);
}

// ------------------ Autocomplete (works on both pages) ------------------
function setupAutocomplete(inputEl, suggestionEl) {
  if (!inputEl || !suggestionEl) return;
  inputEl.addEventListener('input', () => {
    const q = normalize(inputEl.value);
    suggestionEl.innerHTML = '';
    if (!q) { suggestionEl.style.display = 'none'; return; }
    const matches = Object.keys(fakeStockInfo).filter(s => s.includes(q));
    matches.forEach(s => {
      const d = document.createElement('div');
      d.textContent = s;
      d.addEventListener('click', () => {
        inputEl.value = s;
        suggestionEl.style.display = 'none';
        // If it's the main home input, track immediately
        if (inputEl.id === 'stockInput') trackStock();
      });
      suggestionEl.appendChild(d);
    });
    suggestionEl.style.display = matches.length ? 'block' : 'none';
  });

  // hide when clicking outside
  document.addEventListener('click', (e) => {
    if (!suggestionEl.contains(e.target) && e.target !== inputEl) {
      suggestionEl.style.display = 'none';
    }
  });
}

// ------------------ Small helper to generate fake series for charts ----
function generateFakePrices(base, points = 7) {
  let arr = [];
  let p = base;
  for (let i = 0; i < points; i++) {
    p = p + (Math.random() - 0.5) * (p * 0.02);
    arr.push(Number(p.toFixed(2)));
  }
  return arr;
}

// ------------------ Tools page chart toggle logic ------------------
function initToolsChartButtons() {
  const buttons = document.querySelectorAll('.show-chart-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const canvas = document.getElementById(targetId);
      if (!canvas) return;
      const wrapper = canvas.closest('.chart-wrap') || canvas.parentElement;
      // toggle visibility
      const isVisible = wrapper.style.display === 'block';
      if (isVisible) {
        wrapper.style.display = 'none';
        btn.textContent = 'Show Graph';
      } else {
        wrapper.style.display = 'block';
        btn.textContent = 'Hide Graph';
        // init chart if not already
        if (!canvas._chartInitialized) {
          try {
            const raw = canvas.dataset.values || '';
            const data = raw.split(',').map(n => Number(n));
            const labels = data.map((_, i) => `-`); // generic labels
            // create Chart
            new Chart(canvas, {
              type: 'line',
              data: {
                labels,
                datasets: [{ label: canvas.dataset.label || (targetId), data, fill: false, tension: 0.3, pointRadius: 3 }]
              },
              options: { responsive: true, plugins: { legend: { display: false } } }
            });
            canvas._chartInitialized = true;
          } catch (err) {
            console.warn('Failed to init tools chart', err);
          }
        }
      }
    });
    // ensure initially hidden container
    const targetId = btn.dataset.target;
    const canvas = document.getElementById(targetId);
    if (canvas && canvas.parentElement) canvas.parentElement.style.display = 'none';
  });
}

// ------------------ Index cards (Nifty/Sensex) ------------------
function renderIndexCards() {
  const niftyValEl = document.getElementById('niftyValue');
  const niftyChangeEl = document.getElementById('niftyChange');
  const sensexValEl = document.getElementById('sensexValue');
  const sensexChangeEl = document.getElementById('sensexChange');

  // placeholder values (you can update these with the values you want)
  if (niftyValEl) niftyValEl.textContent = '18,230.30';
  if (niftyChangeEl) { niftyChangeEl.textContent = '+0.62%'; niftyChangeEl.style.color = '+'.startsWith('+') ? 'green' : 'red'; }
  if (sensexValEl) sensexValEl.textContent = '61,500.45';
  if (sensexChangeEl) { sensexChangeEl.textContent = '+0.58%'; sensexChangeEl.style.color = '+'.startsWith('+') ? 'green' : 'red'; }
}

// ------------------ Dark mode persistence ------------------
function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  if (!toggleBtn) return;
  // read saved state
  if (localStorage.getItem('darkMode') === 'enabled') document.body.classList.add('dark-mode');
  toggleBtn.addEventListener('click', () => {
    const enabled = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
  });
}

// ------------------ Wiring & event listeners ------------------
window.addEventListener('DOMContentLoaded', () => {
  // render parts
  renderTopStocks();
  renderWishlistPreview();
  renderIndexCards();
  initDarkMode();
  initToolsChartButtons();

  // Autocomplete for home and tools search
  setupAutocomplete(stockInput, suggestionBox);
  setupAutocomplete(stockInputTools, suggestionBoxTools);

  // Buttons (if present)
  if (trackButton) trackButton.addEventListener('click', trackStock);
  if (wishlistButton) wishlistButton.addEventListener('click', addToWishlist);
  if (stockInput) stockInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') trackStock(); });

  if (fetchInfoBtn) fetchInfoBtn.addEventListener('click', fetchInfoTools);
  if (stockInputTools) stockInputTools.addEventListener('keypress', (e) => { if (e.key === 'Enter') fetchInfoTools(); });

  // Tools: prepare "data-label" on canvases for nicer legend
  const canvases = document.querySelectorAll('.chart-canvas');
  canvases.forEach(c => {
    if (!c.dataset.label) {
      // if element id exists, use that as label
      c.dataset.label = c.id || 'series';
    }
  });

  // Sync watchlist changes across tabs/windows
  window.addEventListener('storage', (e) => {
    if (e.key === WATCHLIST_STORAGE_KEY || e.key === 'bullup_watchlist_update_ts') {
      wishlist = JSON.parse(localStorage.getItem(WATCHLIST_STORAGE_KEY)) || [];
      renderWishlistPreview();
    }
  });
});

