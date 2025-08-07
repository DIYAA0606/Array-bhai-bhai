const fakeStockInfo = {
  "SBI": {
    price: 805.15,
    volume: "3,955,677",
    description: "State Bank of India is the country’s largest public sector bank.",
    sector: "Banking"
  },
  "ITC": {
    price: 412.00,
    volume: "8,495,104",
    description: "ITC Limited is a conglomerate with FMCG, cigarettes, and more.",
    sector: "Consumer Goods"
  },
  "Bajaj Finance": {
    price: 876.65,
    volume: "2,483,494",
    description: "Bajaj Finance Ltd is a major NBFC in consumer and SME lending.",
    sector: "Financial Services"
  }
};

const sectorColors = {
  "Banking": "#1f77b4",
  "Consumer Goods": "#ff7f0e",
  "Financial Services": "#2ca02c"
};

window.onload = () => {
  const stockInput = document.getElementById("stockInput");
  const suggestionBox = document.getElementById("suggestions");

  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
  }

  function trackStock() {
    const raw = stockInput.value.trim().toLowerCase();
    const out = document.getElementById("stockData");
    const loader = document.getElementById("loader");

    if (!raw) {
      showToast("⚠️ Please enter a stock
