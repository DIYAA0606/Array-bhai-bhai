// ✅ Updated stock data with volume!
const fakeStockInfo = {
"Motilal Oswal Fin": { 
    "price": 924.75, 
    "volume": "818,392", 
    "description": "Motilal Oswal Financial Services Ltd is a diversified financial services firm offering wealth management, retail and institutional broking, investment banking, asset management, and home finance.", 
    "sector": "Financial Services" 
},
"Bajaj Finance": { 
    "price": 876.65, 
    "volume": "2,483,494", 
    "description": "Bajaj Finance Ltd is a deposit-taking non-banking financial company engaged in consumer lending, SME and commercial lending, mortgages, deposits, and wealth management products.", 
    "sector": "Financial Services" 
},
"Nippon Life Ind": { 
    "price": 812.90, 
    "volume": "31,215", 
    "description": "Nippon Life India Asset Management Ltd manages mutual funds, ETFs, portfolio management services, alternative investment funds, and operates as an asset manager to Nippon India Mutual Fund.", 
    "sector": "Asset Management" 
},
"AU Small Finance": { 
    "price": 735.20, 
    "volume": "1,461,472", 
    "description": "AU Small Finance Bank primarily serves low and middle-income individuals and micro and small businesses, offering loans, deposits, and a wide array of financial products.", 
    "sector": "Banking" 
},
"Indian Bank": { 
    "price": 637.50, 
    "volume": "255,322", 
    "description": "Indian Bank is a public sector bank that provides banking and financial solutions including standard savings and deposit accounts, various loan products, insurance, and international banking services.", 
    "sector": "Banking" 
},
"Hindalco Inds": { 
    "price": 684.85, 
    "volume": "3,475,656", 
    "description": "Hindalco Industries Ltd, part of Aditya Birla Group, is India’s largest producer of aluminium and a major copper producer, with operations in mining, refining, metals, and rolling solutions.", 
    "sector": "Metals & Mining" 
},
"Uno Minda": { 
    "price": 1,086.40, 
    "volume": "431,000", 
    "description": "Uno Minda manufactures automotive components and systems, serving major original equipment manufacturers (OEMs) across India and globally, focusing on product innovation and technology.", 
    "sector": "Automotive Components" 
},
"Shriram Finance": { 
    "price": 630.60, 
    "volume": "3,796,605", 
    "description": "Shriram Finance is one of the largest retail NBFCs in India, offering credit solutions for commercial vehicles, small business, gold loans, and other retail financial services, focusing on underbanked segments.", 
    "sector": "Financial Services" 
},
"Cholam. Inv. & Fin.": { 
    "price": 1,454.90, 
    "volume": "258,532", 
    "description": "Cholamandalam Investment & Finance Company provides diversified financial services including vehicle finance, home loans, SME loans, and home equity loans.", 
    "sector": "Financial Services" 
},
"Jindal Stain.": { 
    "price": 733.50, 
    "volume": "N/A", 
    "description": "Jindal Steel Limited is an integrated steel producer and power producer, manufacturing steel products including rails, TMT bars, and serving infrastructure and construction sectors.", 
    "sector": "Metals & Mining" 
},
"Union Bank (I)": { 
    "price": 131.02, 
    "volume": "14,449,850", 
    "description": "Union Bank of India is a large public sector bank providing a broad suite of banking services including retail, corporate, MSME, and NRI banking.", 
    "sector": "Banking" 
},
"H P C L": { 
    "price": 401.40, 
    "volume": "2,150,407", 
    "description": "Hindustan Petroleum Corporation Limited (HPCL) is an Indian public sector oil and gas company, engaged in refining crude oil and marketing petroleum products.", 
    "sector": "Oil & Gas" 
},
"Canara Bank": { 
    "price": 108.77, 
    "volume": "16,093,000", 
    "description": "Canara Bank is a major public sector bank in India offering personal and corporate banking, investment services, and digital banking solutions through a large nationwide network.", 
    "sector": "Banking" 
},
"Bank of Baroda": { 
    "price": 241.75, 
    "volume": "7,255,738", 
    "description": "Bank of Baroda is a leading public sector bank in India offering a comprehensive range of banking products and services for individuals and businesses.", 
    "sector": "Banking" 
},
"SBI": { 
    "price": 805.15, 
    "volume": "3,955,677", 
    "description": "State Bank of India is the country’s largest public sector bank and financial services company, providing retail banking, corporate banking, and a wide array of financial products.", 
    "sector": "Banking" 
},
"Ashok Leyland": { 
    "price": 120.73, 
    "volume": "1,983,542", 
    "description": "Ashok Leyland is a major manufacturer of commercial vehicles, including trucks and buses, with a strong focus on innovation and sustainable mobility solutions.", 
    "sector": "Automotive" 
},
"NMDC": { 
    "price": 71.86, 
    "volume": "1,433,521", 
    "description": "NMDC Limited is India’s largest public sector mining company specializing in the exploration and production of iron ore and other minerals.", 
    "sector": "Metals & Mining" 
},
"B P C L": { 
    "price": 315.75, 
    "volume": "3,601,019", 
    "description": "Bharat Petroleum Corporation Ltd (BPCL) is engaged in refining, distribution, and marketing of petroleum products, catering to transport, commercial, and industrial sectors.", 
    "sector": "Oil & Gas" 
},
"ITC": { 
    "price": 412.00, 
    "volume": "8,495,104", 
    "description": "ITC Limited is a conglomerate with diversified businesses including FMCG, cigarettes, hotels, packaging, paperboards, agribusiness, and information technology.", 
    "sector": "Consumer Goods" 
},
"Power Fin. Corpn.": { 
    "price": 415.75, 
    "volume": "2,153,430", 
    "description": "Power Finance Corporation Ltd is a leading financial institution in India focused on funding, development, and finance for the power and energy sector.", 
    "sector": "Financial Services" 
}
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
            📦 Volume: ${stock.volume}<br>
            🏭 Sector: ${stock.sector}<br>
            📝 About: ${stock.description}
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








