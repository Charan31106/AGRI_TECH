// Krishi-Sanjeevini Mandi Prices Database & Dynamic Simulator

export const cropsList = [
  { id: "ragi", en: "Ragi (Finger Millet)", kn: "ರಾಗಿ", basePrice: 3450 },
  { id: "rice", en: "Rice (Paddy)", kn: "ಭತ್ತ (ಅಕ್ಕಿ)", basePrice: 2800 },
  { id: "tomato", en: "Tomato", kn: "ಟೊಮೆಟೊ", basePrice: 1500 },
  { id: "onion", en: "Onion", kn: "ಈರುಳ್ಳಿ", basePrice: 2100 },
  { id: "arecanut", en: "Arecanut (Supari)", kn: "ಅಡಿಕೆ", basePrice: 43500 },
  { id: "coconut", en: "Coconut (Per 1000)", kn: "ತೆಂಗಿನಕಾಯಿ (೧೦೦೦ಕ್ಕೆ)", basePrice: 18500 },
  { id: "coffee", en: "Coffee Beans (Robusta)", kn: "ಕಾಫಿ ಬೀಜಗಳು", basePrice: 14200 },
  { id: "jowar", en: "Jowar (Sorghum)", kn: "ಜೋಳ", basePrice: 3800 }
];

export const marketsList = [
  { id: "bengaluru", en: "Bengaluru (Yeshwanthpur)", kn: "ಬೆಂಗಳೂರು (ಯಶವಂತಪುರ)" },
  { id: "kolar", en: "Kolar Market", kn: "ಕೋಲಾರ ಮಾರುಕಟ್ಟೆ" },
  { id: "davanagere", en: "Davanagere Mandi", kn: "ದಾವಣಗೆರೆ ಮಂಡಿ" },
  { id: "hubli", en: "Hubli APMC", kn: "ಹುಬ್ಬಳ್ಳಿ ಎ.ಪಿ.ಎಂ.ಸಿ" },
  { id: "mysore", en: "Mysore Bandipalya", kn: "ಮೈಸೂರು ಬಂಡಿಪಾಳ್ಯ" }
];

// Initialize live memory price structure
let liveMandiData = [];

function initMandiData() {
  liveMandiData = [];
  marketsList.forEach(market => {
    cropsList.forEach(crop => {
      // Add slight variety based on market to make it realistic
      let marketFactor = 0.95 + (Math.random() * 0.1); // ±5% variation per market
      if (market.id === "kolar" && crop.id === "tomato") marketFactor *= 0.85; // Kolar is tomato capital, cheaper
      if (market.id === "bengaluru") marketFactor *= 1.05; // Capital city is slightly more expensive
      
      const currentPrice = Math.round(crop.basePrice * marketFactor);
      const prevPrice = Math.round(currentPrice * (0.96 + Math.random() * 0.08)); // Last 24h variation
      
      liveMandiData.push({
        cropId: crop.id,
        marketId: market.id,
        price: currentPrice,
        prevPrice: prevPrice,
        // Generate simulated 7-day price history
        history: Array.from({ length: 7 }, (_, idx) => {
          const shift = (idx - 6) * (0.01 - Math.random() * 0.02);
          return Math.round(currentPrice * (1 + shift));
        })
      });
    });
  });
}

// Initialize on import
initMandiData();

/**
 * Perform a live price tick simulation on random items.
 * Fluctuates prices by a tiny percentage (±0.1% to ±0.4%) to simulate a real live market ticker.
 */
export function simulateLiveTicks() {
  const tickCount = 2 + Math.floor(Math.random() * 3); // 2 to 4 updates per tick
  const updates = [];
  
  for (let i = 0; i < tickCount; i++) {
    const rIndex = Math.floor(Math.random() * liveMandiData.length);
    const item = liveMandiData[rIndex];
    const percentage = 0.001 + (Math.random() * 0.003); // 0.1% to 0.4%
    const direction = Math.random() > 0.48 ? 1 : -1; // Slight positive bias
    
    const delta = Math.round(item.price * percentage * direction);
    if (delta !== 0) {
      item.price += delta;
      // Update today's history value (last element)
      item.history[item.history.length - 1] = item.price;
      updates.push({
        cropId: item.cropId,
        marketId: item.marketId,
        price: item.price,
        delta: delta
      });
    }
  }
  return updates;
}

/**
 * Fetch all prices with localized translations
 */
export function getMandiPrices(lang = "en") {
  return liveMandiData.map(item => {
    const crop = cropsList.find(c => c.id === item.cropId);
    const market = marketsList.find(m => m.id === item.marketId);
    const diff = item.price - item.prevPrice;
    const percent = ((diff / item.prevPrice) * 100).toFixed(1);
    
    return {
      cropId: item.cropId,
      marketId: item.marketId,
      cropName: lang === "kn" ? crop.kn : crop.en,
      marketName: lang === "kn" ? market.kn : market.en,
      price: item.price,
      change: diff,
      changePercent: percent,
      isUp: diff >= 0,
      history: item.history
    };
  });
}

/**
 * Calculates average price for a crop across all markets
 * Useful for the marketplace fair price advisor
 */
export function getAverageCropPrice(cropId) {
  const matches = liveMandiData.filter(item => item.cropId === cropId);
  if (matches.length === 0) return 0;
  const sum = matches.reduce((acc, curr) => acc + curr.price, 0);
  return Math.round(sum / matches.length);
}

/**
 * Returns a 7-day merged historical price array for a specific crop across all markets
 */
export function getCropHistory(cropId) {
  const matches = liveMandiData.filter(item => item.cropId === cropId);
  const aggregateHistory = [0, 0, 0, 0, 0, 0, 0];
  
  if (matches.length === 0) return aggregateHistory;
  
  for (let day = 0; day < 7; day++) {
    let daySum = 0;
    matches.forEach(m => {
      daySum += m.history[day] || m.price;
    });
    aggregateHistory[day] = Math.round(daySum / matches.length);
  }
  return aggregateHistory;
}
