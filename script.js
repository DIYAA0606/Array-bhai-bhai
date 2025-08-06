
function trackStock() {
    const symbol = document.getElementById("stockInput").value.toUpperCase();
    const stockData = document.getElementById("stockData");

    if (!symbol) {
        stockData.innerHTML = "Please enter a stock symbol.";
        return;
    }

    // Fake data for demo
    const fakePrices = {
        "AAPL": 174.55,
        "GOOGL": 2856.32,
        "TSLA": 714.23,
        "MSFT": 299.72
    };

    if (fakePrices[symbol]) {
        stockData.innerHTML = `📊 Current price of ${symbol}: $${fakePrices[symbol]}`;
    } else {
        stockData.innerHTML = `❌ Sorry, ${symbol} is not in our demo database.`;
    }
}
