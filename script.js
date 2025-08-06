
function trackStock() {
    const symbol = document.getElementById("stockInput").value.toUpperCase();
    const stockData = document.getElementById("stockData");

    if (!symbol) {
        stockData.innerHTML = "Please enter a stock symbol.";
        return;
    }

    // Fake data for demo
    const fakePrices = {
    AAPL: 172.85,
    GOOGL: 2745.23,
    INFY: 1512.4,
    HDFCBANK: 1673.90,
    META: 317.82,
    TCS: 3502.25,
    AMZN: 134.98,
    RELIANCE: 2750.10,
    MSFT: 411.23,
    TESLA: 299.02

    };

 if (fakeStockInfo[symbol]) {
    const stock = fakeStockInfo[symbol];
    document.getElementById("stockData").innerHTML =
        `<strong>📊 ${symbol.toUpperCase()}</strong><br>
        💵 Price: $${stock.price}<br>
        📦 Volume: ${stock.volume}`;
} else {
    document.getElementById("stockData").innerHTML =
        <span style="color: red;">❌ ${symbol.toUpperCase()} not found. Try a valid symbol.</span>;
}

// Allow Enter key to submit input
document.getElementById("stockInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        trackStock();
    }
});
function displayAvailableStocks() {
    const stockList = Object.keys(fakePrices).join(', ');
    document.getElementById("stockList").innerText = Available Stocks: ${stockList};
}

displayAvailableStocks(); // Call it on page load





