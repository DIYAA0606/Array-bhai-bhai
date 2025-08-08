// Fake stock data
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

// Utils
function normalizeStockName(name) {
  return name.trim().toUpperCase();
}

// Home page functions (only run on home page)
if (document.getElementById('stockInput')) {
  const stockInput = document.getElementById('stockInput');
  const suggestionBox = document.getElementById('suggestionBox');
  const stockInfo = document.getElementById('stockInfo');
  const wishlistPreview = document.getElementById('wishlistPreview');
  const wishlistButton = document.getElementById('wishlistButton');
  const trackButton = document.getElementById('trackButton');

  // Load wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  // Render top stocks table
  function renderTopStocksTable() {
    const tbody = document.getElementById("topStocksBody");
    tbody.innerHTML = "";
    topStocks.forEach(stock => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${stock.name}</td>
        <td>${stock.price}</td>
        <td style="color:${stock.change.startsWith('+') ? 'green' : 'red'}">${stock.change}</td>
        <td>${stock.marketCap}</td>
      `;
      tbody.appendChild(row);
    });
  }

  // Render wishlist preview on home page
  function renderWishlistPreview() {
    wishlistPreview.innerHTML = "";
    if (wishlist.length === 0) {
      wishlistPreview.innerHTML = '<li>No stocks added yet.</li>';
      return;
    }
    wishlist.forEach(stock => {
      const li = document.createElement('li');
      li.textContent = stock;
      wishlistPreview.appendChild(li);
    });
  }

  // Track stock info display
  function trackStock() {
    const stock = normalizeStockName(stockInput.value);
    const info = fakeStockInfo[stock];
    if (info) {
      stockInfo.innerHTML = `
        <h3>${stock}</h3>
        <p><strong>Price:</strong> ₹${info.price}</p>
        <p><strong>Volume:</strong> ${info.volume}</p>
        <p><strong>Sector:</strong> ${info.sector}</p>
        <p><strong>P/E Ratio:</strong> ${info.pe}</p>
        <p><strong>Dividend Yield:</strong> ${info.dividend}</p>
        <p>${info.description}</p>
      `;
    } else {
      stockInfo.innerHTML = <p style="color: red;">Stock not found. Please enter a valid stock symbol.</p>;
    }
  }

  // Add to wishlist
  function addToWishlist() {
    const stock = normalizeStockName(stockInput.value);
    if (fakeStockInfo[stock]) {
      if (!wishlist.includes(stock)) {
        wishlist.push(stock);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlistPreview();
        alert(${stock} added to your Watchlist!);
      } else {
        alert(${stock} is already in your Watchlist.);
      }
    } else {
      alert('Please enter a valid stock symbol to add.');
    }
  }

  // Autocomplete suggestions
  stockInput.addEventListener('input', () => {
    const input = normalizeStockName(stockInput.value);
    suggestionBox.innerHTML = '';

    if (!input) {
      suggestionBox.style.display = 'none';
      return;
    }

    const matches = Object.keys(fakeStockInfo).filter(name => name.includes(input));
    matches.forEach(name => {
      const div = document.createElement('div');
      div.textContent = name;
      div.addEventListener('click', () => {
        stockInput.value = name;
        suggestionBox.style.display = 'none';
        trackStock();
      });
      suggestionBox.appendChild(div);
    });

    suggestionBox.style.display = matches.length > 0 ? 'block' : 'none';
  });

  document.addEventListener('click', (e) => {
    if (!suggestionBox.contains(e.target) && e.target !== stockInput) {
      suggestionBox.style.display = 'none';
    }
  });

  // Button listeners
  trackButton.addEventListener('click', trackStock);
  wishlistButton.addEventListener('click', addToWishlist);

  stockInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') trackStock();
  });

  // Initialize
  window.onload = () => {
    renderTopStocksTable();
    renderWishlistPreview();
  };
}

// Watchlist page code
if (document.getElementById('wishlist')) {
  const wishlistEl = document.getElementById('wishlist');
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

  function renderWishlist() {
    wishlistEl.innerHTML = '';
    if (wishlist.length === 0) {
      wishlistEl.innerHTML = '<li>No stocks in your Watchlist yet.</li>';
      return;
    }
    wishlist.forEach(stock => {
      const li = document.createElement('li');
      li.textContent = stock;

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '✖';
      removeBtn.title = 'Remove from Watchlist';
      removeBtn.addEventListener('click', () => {
        wishlist = wishlist.filter(s => s !== stock);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        renderWishlist();
      });

      li.appendChild(removeBtn);
      wishlistEl.appendChild(li);
    });
  }

  window.onload = () => {
    renderWishlist();
  };
}

// Dark mode toggle (common to all pages)
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });

  // Load preference on page load
  window.onload = () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  };
}
