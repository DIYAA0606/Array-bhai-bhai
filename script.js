// ✅ Updated stock data with volume!
const fakeStockInfo = {
    "AAPL": { price: 174.55, volume: "88.9M" },
    "GOOGL": { price: 2856.32, volume: "1.3M" },
    "TSLA": { price: 714.23, volume: "23.4M" },
    "MSFT": { price: 299.72, volume: "19.8M" }
};

// 🔍 Function to track stock on button click or enter
function trackStock() {
    const symbol = document.getElementById("stockInput").value.toUpperCase();
    const stockData = document.getElementById("stockData");

    if (!symbol) {
        stockData.innerHTML = "⚠️ Please enter a stock symbol.";
        return;
    }

    if (fakeStockInfo[symbol]) {
        const stock = fakeStockInfo[symbol];
        stockData.innerHTML = `
            📊 <strong>${symbol}</strong><br>
            💵 Price: $${stock.price}<br>
            📦 Volume: ${stock.volume}
        `;
    } else {
        stockData.innerHTML = `❌ Sorry, ${symbol} is not in our demo database.`;
    }
}

// 🟩 Support "Enter" key press
document.getElementById("stockInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        trackStock();
    }
});

// 📋 Show available stock list below the logo
function displayAvailableStocks() {
    const stockList = Object.keys(fakeStockInfo).join(', ');
    document.getElementById("stockList").innerText = `📦 Available Stocks: ${stockList}`;
}

// 🔁 Call on page load
displayAvailableStocks();







