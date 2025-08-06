// ✅ Updated stock data with volume!
const fakeStockInfo = {
    "Motilal Oswal Fin": { "price": 924.75, "volume": "818,392" },  
"Bajaj Finance": { "price": 876.65, "volume": "2,483,494" },  
"Nippon Life Ind": { "price": 812.90, "volume": "31,215" },  
"AU Small Finance": { "price": 735.20, "volume": "1,461,472" },  
"Indian Bank": { "price": 637.50, "volume": "255,322" },  
"Hindalco Inds": { "price": 684.85, "volume": "3,475,656" },  
"Uno Minda": { "price": 1,086.40, "volume": "431,000" },  
"Shriram Finance": { "price": 630.60, "volume": "3,796,605" },  
"Cholam. Inv. & Fin.": { "price": 1,454.90, "volume": "258,532" },  
"Union Bank (I)": { "price": 131.02, "volume": "14,449,850" },  
"H P C L": { "price": 401.40, "volume": "2,150,407" },  
"Canara Bank": { "price": 108.77, "volume": "16,093,000" },  
"Bank of Baroda": { "price": 241.75, "volume": "7,255,738" },  
"SBI": { "price": 805.15, "volume": "3,955,677" },  
"Ashok Leyland": { "price": 120.73, "volume": "1,983,542" },  
"NMDC": { "price": 71.86, "volume": "1,433,521" },  
"B P C L": { "price": 315.75, "volume": "3,601,019" },  
"ITC": { "price": 412.00, "volume": "8,495,104" },  
"Power Fin. Corpn.": { "price": 415.75, "volume": "2,153,430" },  
"Kalyan Jewellers": { "price": 590.20, "volume": "2,329,207" } 
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

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}






