// Krishi-Sanjeevini Main Application Controller
import { translations } from "./translations.js";
import { cropsList, marketsList, getMandiPrices, simulateLiveTicks, getAverageCropPrice, getCropHistory } from "./mandi.js";
import { schemesData } from "./schemes.js";
import { analyseCropDisease, getChatbotResponse, fileToBase64 } from "./gemini.js";
import { speakText, stopSpeaking, startVoiceRecognition, stopVoiceRecognition, SpeechRecognition } from "./voice.js";


// Global App State
const state = {
  lang: "en",
  theme: "light",
  activePanel: "home",
  apiKey: "AIzaSyB8-l65N1UGfgdFdVrcERHM5Qj5K-c3mdA",
  activeMandiCrop: "ragi",
  selectedMandiMarketFilter: "",
  selectedMandiCropFilter: "",
  mandiSearchQuery: "",
  marketplaceTab: "buy",
  listings: [
    { id: 1, cropId: "ragi", variety: "Indaf-9 High-Yield Ragi", quantity: 20, price: 3420, location: "Davanagere Mandi", contact: "9876543210", isOrganic: true },
    { id: 2, cropId: "rice", variety: "Sona Masuri Paddy", quantity: 65, price: 2780, location: "Mysore Bandipalya", contact: "9988776655", isOrganic: false },
    { id: 3, cropId: "tomato", variety: "Hybrid Red Kolar Tomato", quantity: 8, price: 1480, location: "Kolar Market", contact: "9123456789", isOrganic: true },
    { id: 4, cropId: "onion", variety: "Pune Red Large Onion", quantity: 45, price: 2150, location: "Bengaluru APMC", contact: "9000111222", isOrganic: false }
  ],
  isVoiceListening: false,
  uploadedFile: null,
  activeVideoTrack: null,
  currentDiseaseAnalysis: null,
  activeCropScan: "auto",
  twin: {
    landSize: 12.5,
    primaryCrop: "sugarcane",
    irrigation: "canal",
    climate: "humid"
  },
  userLocation: {
    lat: 12.5218,
    lon: 76.8973,
    city: "Mandya",
    isGPSActive: false
  }
};

// Dom Reference Cache
const dom = {
  body: document.body,
  langBtn: document.getElementById("lang-btn"),
  themeBtn: document.getElementById("theme-btn"),
  themeIcon: document.getElementById("theme-icon"),
  settingsBtn: document.getElementById("settings-btn"),
  floatingMic: document.getElementById("floating-mic"),
  voiceOverlay: document.getElementById("voice-overlay"),
  voiceOverlayStatus: document.getElementById("txt-voiceActive"),
  voiceOverlayCommand: document.getElementById("txt-voiceCommandList"),
  closeVoiceBtn: document.getElementById("btn-closeVoiceBtn"),
  voicePill: document.getElementById("voice-pill"),
  brandHome: document.getElementById("brand-home-link"),
  
  // Navigation Panels
  panels: {
    home: document.getElementById("panel-home"),
    disease: document.getElementById("panel-disease"),
    mandi: document.getElementById("panel-mandi"),
    marketplace: document.getElementById("panel-marketplace"),
    weather: document.getElementById("panel-weather"),
    soil: document.getElementById("panel-soil"),
    schemes: document.getElementById("panel-schemes"),
    settings: document.getElementById("panel-settings"),
    "digital-twin": document.getElementById("panel-digital-twin")
  },
 
  // Disease Analyser Panel
  dropZone: document.getElementById("drop-zone"),
  browseBtn: document.getElementById("btn-browseFiles"),
  fileInput: document.getElementById("file-input"),
  cameraContainer: document.getElementById("camera-container"),
  cameraStream: document.getElementById("camera-stream"),
  previewContainer: document.getElementById("preview-container"),
  imagePreview: document.getElementById("image-preview"),
  laser: document.getElementById("laser"),
  laserPreview: document.getElementById("laser-preview"),
  cameraBtn: document.getElementById("camera-btn"),
  captureBtn: document.getElementById("btn-captureBtn"),
  cancelCameraBtn: document.getElementById("btn-cancelCamBtn"),
  analyseBtn: document.getElementById("btn-scanStartBtn"),
  diagnosisHud: document.getElementById("diagnosis-hud"),
  resultPlaceholder: document.getElementById("result-placeholder"),
  resultBox: document.getElementById("result-box"),
  storeSuggestionsContainer: document.getElementById("store-suggestions-container"),
  lblLocationSource: document.getElementById("lbl-location-source"),
  storeLocatorCard: document.getElementById("store-locator-card"),
  voiceReadoutBtn: document.getElementById("voice-readout-btn"),
  stopVoiceBtn: document.getElementById("btn-stopVoice"),
  
  // Disease Output fields
  resCropName: document.getElementById("res-crop-name"),
  resDiseaseName: document.getElementById("res-disease-name"),
  resSeverity: document.getElementById("res-severity"),
  resCauses: document.getElementById("res-causes"),
  resOrganic: document.getElementById("res-organic"),
  resChemical: document.getElementById("res-chemical"),
  resPrevention: document.getElementById("res-prevention"),
 
  // Mandi Panel
  mandiSearch: document.getElementById("txt-searchPlaceholder"),
  mandiMarketFilter: document.getElementById("mandi-market-filter"),
  mandiCropFilter: document.getElementById("mandi-crop-filter"),
  mandiTableBody: document.getElementById("mandi-table-body"),
  mandiAvgPriceVal: document.getElementById("mandi-avg-price-val"),
  mandiSvgChart: document.getElementById("mandi-svg-chart"),
  mandiTickerTape: document.getElementById("mandi-ticker-tape"),
 
  // Marketplace Panel
  tabBuy: document.getElementById("btn-buyHarvest"),
  tabSell: document.getElementById("btn-sellHarvest"),
  marketBuySection: document.getElementById("market-buy-section"),
  marketSellSection: document.getElementById("market-sell-section"),
  listingsGrid: document.getElementById("listings-grid"),
  sellHarvestForm: document.getElementById("sell-harvest-form"),
  sellCropSelect: document.getElementById("sell-crop-select"),
  sellPriceInput: document.getElementById("sell-price"),
  marketplaceFairAdvisor: document.getElementById("marketplace-fair-advisor"),
  fairAdvisorText: document.getElementById("fair-advisor-text"),
 
  // Weather Panel
  txtWeatherAlert: document.getElementById("txt-weather-alert"),
  valTemperature: document.getElementById("val-temperature"),
  valHumidity: document.getElementById("val-humidity"),
  valWindSpeed: document.getElementById("val-windSpeed"),
  valConditionText: document.getElementById("val-condition-text"),
  weatherLocationName: document.getElementById("weather-location-name"),
  weatherHeroBg: document.getElementById("weather-hero-bg"),
  dynamicWeatherIcon: document.getElementById("dynamic-weather-icon"),
  cardKharif: document.getElementById("card-kharif"),
  cardRabi: document.getElementById("card-rabi"),
  cardZaid: document.getElementById("card-zaid"),
 
  // Soil Advisor Panel
  soilTypeSelect: document.getElementById("soil-type-select"),
  soilN: document.getElementById("soil-n"),
  soilNVal: document.getElementById("soil-n-val"),
  soilP: document.getElementById("soil-p"),
  soilPVal: document.getElementById("soil-p-val"),
  soilK: document.getElementById("soil-k"),
  soilKVal: document.getElementById("soil-k-val"),
  soilPH: document.getElementById("soil-ph"),
  soilPHVal: document.getElementById("soil-ph-val"),
  calculateSoilBtn: document.getElementById("btn-calcSoilBtn"),
  soilPlaceholder: document.getElementById("soil-placeholder"),
  soilReport: document.getElementById("soil-report"),
  soilStatusBadge: document.getElementById("soil-status-badge"),
  soilRecCrops: document.getElementById("soil-rec-crops"),
  soilRecFertilizers: document.getElementById("soil-rec-fertilizers"),
  soilRecOrganic: document.getElementById("soil-rec-organic"),
 
  // Schemes Panel
  schemeSearchInput: document.getElementById("txt-searchSchemes"),
  schemesAccordionContainer: document.getElementById("schemes-accordion-container"),
 
  // Settings Panel
  settingsApiKey: document.getElementById("txt-apiPlaceholder"),
  settingsApiStatus: document.getElementById("settings-api-status"),
  themeLightBtn: document.getElementById("btn-lightMode"),
  themeDarkBtn: document.getElementById("btn-darkMode"),
  saveSettingsBtn: document.getElementById("btn-apiSaveBtn"),
 
  // Chatbot Window
  chatbotTrigger: document.getElementById("chatbot-trigger"),
  chatbotWindow: document.getElementById("chatbot-window"),
  chatBody: document.getElementById("chat-body"),
  chatInput: document.getElementById("chat-input"),
  sendChatBtn: document.getElementById("send-chat-btn"),
  closeChat: document.getElementById("close-chat"),
  chatQuickTags: document.getElementById("chat-quick-tags"),
  
  // Digital Twin Panel Elements
  twinBoard3D: document.getElementById("farm-board-3d"),
  twinLandSizeInput: document.getElementById("input-land-size"),
  twinLandSizeDisplay: document.getElementById("lbl-land-size-display"),
  twinPrimaryCropSelect: document.getElementById("select-primary-crop"),
  twinIrrigationSelect: document.getElementById("select-irrigation"),
  twinClimateSelect: document.getElementById("select-climate"),
  twinConfigForm: document.getElementById("farm-config-form"),
  twinAcreageBadge: document.getElementById("lbl-twin-acreage-badge"),
  twinOverviewYield: document.getElementById("lbl-overview-yield"),
  twinOverviewWater: document.getElementById("lbl-overview-water"),
  twinOverviewProfit: document.getElementById("lbl-overview-profit"),
  twinTooltip: document.getElementById("farm-hover-tooltip"),
  twinTTCropBadge: document.getElementById("tt-crop-badge"),
  twinTTStatusBadge: document.getElementById("tt-status-badge"),
  twinTTCropVal: document.getElementById("tt-crop"),
  twinTTAcreageVal: document.getElementById("tt-acreage"),
  twinTTYieldVal: document.getElementById("tt-yield"),
  twinTTWaterVal: document.getElementById("tt-water"),
  twinTTProfitVal: document.getElementById("tt-profit")
};

// ==========================================
// 1. APPLICATION INITIALIZATION & CORE SETUP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Load State from localStorage
  const savedKey = localStorage.getItem("krishi_gemini_api_key");
  if (savedKey) {
    state.apiKey = savedKey;
    dom.settingsApiKey.value = savedKey;
  }
  
  const savedLang = localStorage.getItem("krishi_lang");
  if (savedLang) {
    state.lang = savedLang;
  }
  
  const savedTheme = localStorage.getItem("krishi_theme");
  if (savedTheme) {
    state.theme = savedTheme;
    applyTheme(savedTheme);
  }

  // Bind all event listeners
  setupEventListeners();

  // Populate Dropdowns & Render Initial Lists
  initDropdowns();
  translateDOM();
  renderMandiPrices();
  renderMarketplaceListings();
  renderSchemes();
  updateAdvisoryBar();

  // Setup periodic live Mandi ticker tick updates
  setInterval(() => {
    const ticks = simulateLiveTicks();
    if (ticks.length > 0) {
      renderMandiPrices();
      updateMandiTickerTape();
    }
  }, 5000); // simulate price changes every 5 seconds

  // Initialize 3D Digital Twin
  initTwin();
});

/**
 * Applies active light/dark display modes
 */
function applyTheme(theme) {
  if (theme === "dark") {
    dom.body.classList.add("dark");
    dom.themeLightBtn.classList.remove("active");
    dom.themeDarkBtn.classList.add("active");
    dom.themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.01a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>`;
  } else {
    dom.body.classList.remove("dark");
    dom.themeLightBtn.classList.add("active");
    dom.themeDarkBtn.classList.remove("active");
    dom.themeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>`;
  }
}

/**
 * Initializes static dropdowns with values from databases
 */
function initDropdowns() {
  // Clear lists first
  dom.mandiMarketFilter.innerHTML = `<option value="" id="opt-all-markets">${translations[state.lang].filterMarket}</option>`;
  dom.mandiCropFilter.innerHTML = `<option value="" id="opt-all-crops">${translations[state.lang].filterCrop}</option>`;
  dom.sellCropSelect.innerHTML = "";

  // Populate Markets in filter list
  marketsList.forEach(m => {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = state.lang === "kn" ? m.kn : m.en;
    dom.mandiMarketFilter.appendChild(opt);
  });

  // Populate Crops in filter and listing forms
  cropsList.forEach(c => {
    // Mandi Filter
    const optMandi = document.createElement("option");
    optMandi.value = c.id;
    optMandi.textContent = state.lang === "kn" ? c.kn : c.en;
    dom.mandiCropFilter.appendChild(optMandi);

    // Marketplace Crop select options
    const optMarket = document.createElement("option");
    optMarket.value = c.id;
    optMarket.textContent = state.lang === "kn" ? c.kn : c.en;
    dom.sellCropSelect.appendChild(optMarket);
  });
}

/**
 * Handles fast recursive UI translations based on specific ID prefixes
 */
function translateDOM() {
  const dict = translations[state.lang];
  dom.langBtn.textContent = dict.langToggle;

  // Perform translation lookups
  document.querySelectorAll("[id]").forEach(node => {
    const id = node.id;
    let key = null;

    if (id.startsWith("txt-")) key = id.substring(4);
    else if (id.startsWith("lbl-")) key = id.substring(4);
    else if (id.startsWith("btn-")) key = id.substring(4);
    else if (id.startsWith("stat-")) key = id.substring(5);
    else if (id.startsWith("opt-")) key = id.substring(4);
    else if (id.startsWith("th-")) key = id.substring(3);
    else if (id.startsWith("card-")) {
      const parts = id.split("-");
      // e.g. card-diag-title -> diagTitle
      if (parts.length > 2) {
        const camel = parts[1] + parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
        key = camel;
      } else {
        key = parts[1];
      }
    }

    if (key && dict[key]) {
      if (node.tagName === "INPUT" || node.tagName === "TEXTAREA") {
        node.placeholder = dict[key];
      } else {
        node.textContent = dict[key];
      }
    }
  });

  // Localized Settings Subtitles
  if (state.apiKey) {
    dom.settingsApiStatus.textContent = dict.apiKeyFound;
    dom.settingsApiStatus.style.color = "var(--primary)";
  } else {
    dom.settingsApiStatus.textContent = dict.demoModeActive;
    dom.settingsApiStatus.style.color = "var(--accent-clay)";
  }

  // Manually translate elements that don't use txt- prefix
  if (dom.chatInput) {
    dom.chatInput.placeholder = dict.botPlaceholder;
  }

  // Update Dynamic text content in list items
  initDropdowns();
  renderMandiPrices();
  renderMarketplaceListings();
  renderSchemes();
  updateAdvisoryBar();
  updateMandiTickerTape();
  if (dom.twinBoard3D) {
    recalculateTwinStats();
    render3DFarmReplica();
  }

  // Update dynamic store suggestions translation
  if (state.currentDiseaseAnalysis && dom.resultBox && dom.resultBox.style.display === "block") {
    const result = state.currentDiseaseAnalysis;
    const organicProduct = detectRemedyProduct(result.organic);
    const chemicalProduct = detectRemedyProduct(result.chemical);
    const fullText = `${result.organic} ${result.chemical} ${result.causes} ${result.prevention}`.toLowerCase();
    
    let detectedItem = null;
    if (fullText.includes("nitrogen") || fullText.includes("urea") || fullText.includes("ಯೂರಿಯಾ") || fullText.includes("ಸಾರಜನಕ")) {
      detectedItem = productPricesDb["urea"];
    } else {
      detectedItem = chemicalProduct || organicProduct || productPricesDb["copper oxychloride"];
    }
    generateStoreSuggestions(detectedItem);
  }
}

/**
 * Updates quick stats indicators in the header dashboard
 */
function updateAdvisoryBar() {
  const dict = translations[state.lang];
  
  if (state.lang === "kn") {
    dom.txtWeatherAlert.textContent = "ಮುಂದಿನ ೪೮ ಗಂಟೆಗಳಲ್ಲಿ ದಕ್ಷಿಣ ಕರ್ನಾಟಕದಲ್ಲಿ ಭಾರಿ ಮಳೆ ನಿರೀಕ್ಷೆ. ಬೆಳೆಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿರಿಸಿ!";
  } else {
    dom.txtWeatherAlert.textContent = "Heavy rainfall expected in South Karnataka region over the next 48 hours. Secure harvested stock!";
  }

  // Weather Advisory value
  document.getElementById("stat-weather-val").textContent = state.lang === "kn" ? "ಮಳೆಯ ಮುನ್ಸೂಚನೆ: ೮೫%" : "Rain probability: 85%";
  
  // Current sowing seasons advice
  document.getElementById("stat-season-val").textContent = state.lang === "kn" ? "ಖಾರಿಫ್: ರಾಗಿ ಮತ್ತು ಭತ್ತ ಬಿತ್ತನೆ ಮಾಡಿ" : "Kharif: Sow Ragi & Rice";
  
  // Live Mandi averages ragi tracker
  const avgRagi = getAverageCropPrice("ragi");
  document.getElementById("stat-mandi-val").textContent = `₹${avgRagi.toLocaleString()} ${dict.rupeesPerQuintal}`;

  // Voice Pill status indicator
  document.getElementById("stat-voice-val").textContent = state.lang === "kn" ? "ಮಾತನಾಡಲು ಮೈಕ್ ಒತ್ತಿ" : "Click Mic to talk";
}

/**
 * Fetches Live Weather from OpenWeatherMap API and updates current season
 */
async function fetchLiveWeather() {
  const apiKey = "22ee75f3f282f6d621b3f3176fe21f94";

  const fetchWeatherData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.main) {
        if (dom.valTemperature) dom.valTemperature.textContent = `${Math.round(data.main.temp)}°C`;
        if (dom.valHumidity) dom.valHumidity.textContent = `${data.main.humidity}%`;
        if (dom.valWindSpeed) dom.valWindSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        
        if (dom.weatherLocationName) dom.weatherLocationName.textContent = data.name;
        state.userLocation.city = data.name;

        const weatherMain = data.weather[0].main.toLowerCase();
        const weatherDesc = data.weather[0].description;
        
        state.currentWeatherForAI = {
          main: weatherMain,
          temp: data.main.temp,
          desc: weatherDesc
        };
        
        if (dom.valConditionText) dom.valConditionText.textContent = weatherDesc;
        
        let alertMsgEn = `Live Feed: Clear skies detected over ${data.name}. Excellent conditions for scheduled field activities.`;
        let alertMsgKn = `ನೇರ ಪ್ರಸಾರ: ${data.name} ನಲ್ಲಿ ಸ್ವಚ್ಛ ಆಕಾಶ. ಕೃಷಿ ಚಟುವಟಿಕೆಗಳಿಗೆ ಉತ್ತಮ ವಾತಾವರಣ.`;
        
        // Remove old gradients
        if (dom.weatherHeroBg) {
           dom.weatherHeroBg.classList.remove('bg-sunny', 'bg-cloudy', 'bg-rainy');
        }

        let svgIcon = '';

        if (weatherMain.includes("rain") || weatherMain.includes("drizzle") || weatherMain.includes("thunderstorm")) {
           alertMsgEn = `URGENT ALERT: Rainfall expected in ${data.name}. Please secure harvested stock and delay pesticide spraying immediately.`;
           alertMsgKn = `ತುರ್ತು ಎಚ್ಚರಿಕೆ: ${data.name} ನಲ್ಲಿ ಮಳೆಯ ಮುನ್ಸೂಚನೆ. ಕಟಾವು ಮಾಡಿದ ಬೆಳೆ ರಕ್ಷಿಸಿ ಮತ್ತು ಕೀಟನಾಶಕ ಸಿಂಪಡಣೆ ಮಾಡಬೇಡಿ.`;
           if (dom.weatherHeroBg) dom.weatherHeroBg.classList.add('bg-rainy');
           svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud-rain"><path d="M16 13v8"></path><path d="M8 13v8"></path><path d="M12 15v8"></path><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`;
        } else if (weatherMain.includes("cloud")) {
           if (dom.weatherHeroBg) dom.weatherHeroBg.classList.add('bg-cloudy');
           svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cloud"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;
        } else {
           if (dom.weatherHeroBg) dom.weatherHeroBg.classList.add('bg-sunny');
           svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun rotating"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
           
           if (data.main.temp > 35) {
             alertMsgEn = `HEAT WAVE ALERT in ${data.name}! Ensure adequate crop irrigation and protect saplings.`;
             alertMsgKn = `${data.name} ನಲ್ಲಿ ಅಧಿಕ ತಾಪಮಾನ! ಬೆಳೆಗಳಿಗೆ ಸಾಕಷ್ಟು ನೀರುಣಿಸಿ ಮತ್ತು ಸಸಿಗಳನ್ನು ರಕ್ಷಿಸಿ.`;
           }
        }
        
        if (dom.dynamicWeatherIcon && svgIcon) {
           dom.dynamicWeatherIcon.innerHTML = svgIcon;
        }

        if (dom.txtWeatherAlert) {
           dom.txtWeatherAlert.textContent = state.lang === "kn" ? alertMsgKn : alertMsgEn;
        }
      }
    } catch (error) {
      console.error("Failed to fetch live weather:", error);
    }
  };

  const getFallbackWeather = async () => {
    // Ultimate fallback for this user if Windows Location Services are disabled
    const city = "Mandya"; 
    state.userLocation.lat = 12.5218;
    state.userLocation.lon = 76.8973;
    state.userLocation.city = "Mandya";
    state.userLocation.isGPSActive = false;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        state.userLocation.lat = lat;
        state.userLocation.lon = lon;
        state.userLocation.isGPSActive = true;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetchWeatherData(url);
      },
      (error) => {
        console.warn("Geolocation denied/failed. Trying IP-based location fallback...", error);
        getFallbackWeather();
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    );
  } else {
    getFallbackWeather();
  }

  // Update Live Calendar Season
  const month = new Date().getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  
  if (dom.cardKharif && dom.cardRabi && dom.cardZaid) {
    // Reset borders
    dom.cardKharif.style.border = "1px solid var(--border-color)";
    dom.cardRabi.style.border = "1px solid var(--border-color)";
    dom.cardZaid.style.border = "1px solid var(--border-color)";

    if (month >= 5 && month <= 9) {
      // June to October: Kharif
      dom.cardKharif.style.border = "3px solid var(--primary)";
    } else if (month >= 2 && month <= 4) {
      // March to May: Zaid
      dom.cardZaid.style.border = "3px solid var(--primary)";
    } else {
      // November to February: Rabi
      dom.cardRabi.style.border = "3px solid var(--primary)";
    }
  }
}

// ==========================================
// 2. SPA ROUTING ENGINE
// ==========================================

window.switchPanel = function(panelId) {
  // Stop speaking when navigating between screens
  stopSpeaking();
  if (dom.stopVoiceBtn) dom.stopVoiceBtn.style.display = "none";
  if (dom.voiceReadoutBtn) dom.voiceReadoutBtn.style.display = "inline-flex";

  // Hide all panels
  Object.keys(dom.panels).forEach(key => {
    dom.panels[key].classList.remove("active");
  });

  // Activate selected panel
  if (dom.panels[panelId]) {
    dom.panels[panelId].classList.add("active");
    state.activePanel = panelId;
  }

  // Reset or run specific routing checks
  if (panelId === "mandi") {
    renderMandiPrices();
    drawTrendChart();
  }
  if (panelId === "weather") {
    fetchLiveWeather();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  // Accessibility readout introduction
  readSectionAccessibilityDescription(panelId);
};

/**
 * Accessibility reader details to narrate sections aloud
 */
function readSectionAccessibilityDescription(panelId) {
  const dict = translations[state.lang];
  let prompt = "";

  switch (panelId) {
    case "home":
      prompt = dict.appSubtitle;
      break;
    case "disease":
      prompt = dict.uploadTitle + ". " + dict.uploadSubtitle;
      break;
    case "mandi":
      prompt = dict.mandiHeader + ". " + dict.mandiSubtitle;
      break;
    case "marketplace":
      prompt = dict.marketHeader + ". " + dict.marketSubtitle;
      break;
    case "weather":
      prompt = dict.weatherHeader + ". " + dict.weatherSubtitle;
      break;
    case "soil":
      prompt = dict.soilHeader + ". " + dict.soilSubtitle;
      break;
    case "schemes":
      prompt = dict.schemesHeader + ". " + dict.schemesSubtitle;
      break;
  }

  if (prompt) {
    // Perform short high-contrast hover audio trigger (gentle, non-intrusive)
    console.log(`Access Readout: "${prompt}"`);
  }
}

// ==========================================
// 3. VOICE ASSISTANT CORE CONTROLLER
// ==========================================

function toggleVoiceRecognition() {
  if (state.isVoiceListening) {
    stopVoiceRecognition();
    deactivateVoiceOverlay();
  } else {
    // Narrate wake up prompt
    const wakeMsg = state.lang === "kn" 
      ? "ಹೇಳಿ, ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ. ರೋಗ ತಪಾಸಣೆ, ಮಂಡಿ ಬೆಲೆ ಅಥವಾ ಹವಾಮಾನ ಎಂದು ಹೇಳಿ." 
      : "Listening. Say scan crop, check mandi, or weather advisory.";
    
    const startListening = () => {
      startVoiceRecognition({
        lang: state.lang,
        onStart: () => {
          dom.voiceOverlayStatus.textContent = translations[state.lang].voiceListening;
        },
        onResult: ({ rawText, command }) => {
          dom.voiceOverlayCommand.textContent = `"${rawText}"`;
          handleVoiceCommand(command, rawText);
        },
        onEnd: () => {
          if (state.isVoiceListening) {
            setTimeout(startListening, 300);
          } else {
            deactivateVoiceOverlay();
          }
        },
        onError: (err) => {
          console.error("Voice recognition error: ", err);
          if (err !== "no-speech") {
            deactivateVoiceOverlay();
          }
        }
      });
    };
    
    speakText(wakeMsg, state.lang).then(() => {
      // Start recognition after speak completes
      activateVoiceOverlay();
      startListening();
    }).catch(e => {
      console.warn("Speech synthesis blocked voice launch", e);
      // Fallback direct start
      activateVoiceOverlay();
      startListening();
    });
  }
}

function activateVoiceOverlay() {
  state.isVoiceListening = true;
  dom.voiceOverlay.classList.add("active");
}

function deactivateVoiceOverlay() {
  state.isVoiceListening = false;
  dom.voiceOverlay.classList.remove("active");
  stopVoiceRecognition();
}

/**
 * Handles action routing mapped from recognized words
 */
function handleVoiceCommand(command, rawText) {
  const dict = translations[state.lang];
  console.log(`Parsed command action matches: "${command}"`);

  if (command === "unknown" || !command) {
    if (rawText && rawText.trim().length > 0) {
      getChatbotResponse(rawText, state.lang, state.apiKey).then(aiResponse => {
        speakText(aiResponse.text, state.lang);
      }).catch(e => {
        console.error("Failed to get AI voice response:", e);
        const errorMsg = state.lang === "kn" 
          ? "ಕ್ಷಮಿಸಿ, ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳಿ." 
          : "Sorry, I couldn't catch that command. Please try again.";
        speakText(errorMsg, state.lang);
      });
    } else {
      const errorMsg = state.lang === "kn" 
        ? "ಕ್ಷಮಿಸಿ, ಅರ್ಥವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಸ್ಪಷ್ಟವಾಗಿ ಹೇಳಿ." 
        : "Sorry, I couldn't catch that command. Please try again.";
      speakText(errorMsg, state.lang);
    }
    return;
  }

  // Switch SPA panels
  if (command === "language") {
    toggleLanguage();
    const switchMsg = state.lang === "kn" 
      ? "ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ." 
      : "Language successfully switched to English.";
    speakText(switchMsg, state.lang);
    return;
  }

  if (command === "chat") {
    // Open chat overlay widget
    window.switchPanel("home");
    dom.chatbotWindow.style.display = "flex";
    dom.chatInput.focus();
    speakText(translations[state.lang].botIntro, state.lang);
    return;
  }

  // Route regular panels
  window.switchPanel(command);

  // Speak out confirmation feedback
  let confirmation = "";
  if (command === "home") confirmation = state.lang === "kn" ? "ಮುಖಪುಟಕ್ಕೆ ಸ್ವಾಗತ" : "Welcome back to home dashboard";
  if (command === "scan") confirmation = state.lang === "kn" ? "ಸಸ್ಯ ರೋಗ ವಿಶ್ಲೇಷಣೆ ಸಿದ್ಧವಾಗಿದೆ. ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ" : "Crop Disease Analyser loaded. Please upload your crop leaf photo.";
  if (command === "mandi") confirmation = state.lang === "kn" ? "ಲೈವ್ ಮಂಡಿ ಬೆಲೆಗಳು ಇಲ್ಲಿವೆ" : "Here are today's live Mandi pricing coordinates";
  if (command === "buy") confirmation = state.lang === "kn" ? "ರೈತ ಮಾರುಕಟ್ಟೆ ಲೋಡ್ ಆಗಿದೆ" : "Marketplace listings loaded successfully";
  if (command === "weather") confirmation = state.lang === "kn" ? "ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ವಿವರಗಳು" : "Here is the localized rain advisory forecast";
  if (command === "soil") confirmation = state.lang === "kn" ? "ಮಣ್ಣಿನ ಆರೋಗ್ಯ ತಪಾಸಣೆ" : "Soil NPK diagnostics advisor is ready";
  if (command === "schemes") confirmation = state.lang === "kn" ? "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಪಟ್ಟಿ" : "Here is the active agricultural subsidies register";

  if (confirmation) {
    speakText(confirmation, state.lang);
  }
}

// ==========================================
// 4. CROP DISEASE DIAGNOSTICS MODULE
// ==========================================

// Drag & drop file event bindings
dom.dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dom.dropZone.style.borderColor = "var(--primary-glow)";
});

dom.dropZone.addEventListener("dragleave", () => {
  dom.dropZone.style.borderColor = "var(--primary-light)";
});

dom.dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dom.dropZone.style.borderColor = "var(--primary-light)";
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    handleSelectedImageFile(file);
  }
});

dom.browseBtn.addEventListener("click", () => dom.fileInput.click());
dom.fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    handleSelectedImageFile(file);
  }
});

function handleSelectedImageFile(file) {
  state.uploadedFile = file;
  
  // Show Preview Image
  const reader = new FileReader();
  reader.onload = (e) => {
    dom.imagePreview.src = e.target.result;
    dom.dropZone.style.display = "none";
    dom.cameraContainer.style.display = "none";
    dom.previewContainer.style.display = "block";
    dom.analyseBtn.style.display = "inline-flex";
    
    // Hide old results
    dom.resultBox.style.display = "none";
    dom.resultPlaceholder.style.display = "block";
  };
  reader.readAsDataURL(file);
}

// Direct Camera capture pipeline
dom.cameraBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" }, // preferential back camera for leaves
      audio: false
    });
    
    dom.cameraStream.srcObject = stream;
    state.activeVideoTrack = stream.getVideoTracks()[0];
    
    dom.dropZone.style.display = "none";
    dom.previewContainer.style.display = "none";
    dom.cameraContainer.style.display = "block";
    dom.captureBtn.style.display = "inline-flex";
    dom.cancelCameraBtn.style.display = "inline-flex";
    dom.cameraBtn.style.display = "none";
    dom.analyseBtn.style.display = "none";
    
    // Clear old result boxes
    dom.resultBox.style.display = "none";
    dom.resultPlaceholder.style.display = "block";
  } catch (err) {
    console.error("Camera access failed", err);
    alert(state.lang === "kn" ? "ಕ್ಯಾಮೆರಾ ಬಳಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿಲ್ಲ." : "Unable to access device camera. Please upload file instead.");
  }
});

dom.cancelCameraBtn.addEventListener("click", stopCameraPipeline);

function stopCameraPipeline() {
  if (state.activeVideoTrack) {
    state.activeVideoTrack.stop();
    state.activeVideoTrack = null;
  }
  dom.cameraContainer.style.display = "none";
  dom.dropZone.style.display = "flex";
  dom.captureBtn.style.display = "none";
  dom.cancelCameraBtn.style.display = "none";
  dom.cameraBtn.style.display = "inline-flex";
  dom.analyseBtn.style.display = "none";
}

dom.captureBtn.addEventListener("click", () => {
  if (!dom.cameraStream.srcObject) return;
  
  // Capture frame into virtual canvas
  const canvas = document.createElement("canvas");
  canvas.width = dom.cameraStream.videoWidth;
  canvas.height = dom.cameraStream.videoHeight;
  
  const ctx = canvas.getContext("2d");
  ctx.drawImage(dom.cameraStream, 0, 0, canvas.width, canvas.height);
  
  const dataUrl = canvas.toDataURL("image/jpeg");
  dom.imagePreview.src = dataUrl;
  
  // Convert DataUrl to file blob in memory
  fetch(dataUrl)
    .then(res => res.blob())
    .then(blob => {
      state.uploadedFile = new File([blob], "captured_crop.jpg", { type: "image/jpeg" });
    });

  // Stop camera feed and show preview capture
  stopCameraPipeline();
  dom.dropZone.style.display = "none";
  dom.previewContainer.style.display = "block";
  dom.analyseBtn.style.display = "inline-flex";
});

// Gemini crop disease analyser submission
dom.analyseBtn.addEventListener("click", async () => {
  if (!state.uploadedFile) {
    alert(translations[state.lang].noImageError);
    return;
  }

  // Display Scanner effects & Hud Steps
  dom.laserPreview.style.display = "block";
  dom.analyseBtn.style.display = "none";
  dom.cameraBtn.style.display = "none";
  dom.diagnosisHud.style.display = "flex";
  dom.resultPlaceholder.style.display = "none";
  dom.resultBox.style.display = "none";

  // Cycle progress HUD step checks dynamically to look gorgeous
  runScannerStepAnimation(1);
  setTimeout(() => runScannerStepAnimation(2), 900);
  setTimeout(() => runScannerStepAnimation(3), 1800);
  setTimeout(() => runScannerStepAnimation(4), 2600);

  try {
    const base64 = await fileToBase64(state.uploadedFile);
    const mime = state.uploadedFile.type;
    const filename = state.uploadedFile.name;

    // Issue Gemini call with live weather context
    const result = await analyseCropDisease(base64, mime, state.lang, state.apiKey, filename, state.activeCropScan, state.currentWeatherForAI);

    // Hide loader and scanners
    dom.diagnosisHud.style.display = "none";
    dom.laserPreview.style.display = "none";
    dom.cameraBtn.style.display = "inline-flex";
    dom.dropZone.style.display = "flex";
    dom.previewContainer.style.display = "none";

    // Bind results to UI nodes
    renderDiseaseResults(result);
  } catch (error) {
    console.error("Diagnosis error", error);
    dom.diagnosisHud.style.display = "none";
    dom.laserPreview.style.display = "none";
    dom.analyseBtn.style.display = "inline-flex";
    dom.cameraBtn.style.display = "inline-flex";
    alert(state.lang === "kn" ? "ವಿಶ್ಲೇಷಣೆ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೊಮ್ಮೆ ಪ್ರಯತ್ನಿಸಿ." : "Analysis failed. Please verify API configurations and try again.");
  }
});

function runScannerStepAnimation(stepIndex) {
  // Clear steps
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`step-${i}`);
    if (i < stepIndex) {
      el.className = "step-item done";
    } else if (i === stepIndex) {
      el.className = "step-item active";
    } else {
      el.className = "step-item";
    }
  }
}

function formatMarkdownText(text) {
  if (!text) return "";
  
  let html = text;
  
  // 1. Force newlines before numbers that are hidden inside a paragraph
  // For example: "text 2. text" -> "text\n2. text"
  html = html.replace(/([^\n>])\s+(\d+\.)\s/g, "$1\n$2 ");

  // 2. Fix AI sometimes returning comma-separated numbered lists (e.g. .,**2. or ,**3.)
  html = html.replace(/\.,\s*(<strong)/g, ".\n$1");
  html = html.replace(/,\s*(<strong)/g, "\n$1");
  html = html.replace(/\.,\s*(\d+\.)/g, ".\n$1");

  // 3. Convert Markdown bold and italic
  html = html
    .replace(/\*\*(.*?)\*\*/g, "<strong style='color: var(--primary-dark);'>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // 4. Bold any numbers at the start of a line
  html = html.replace(/^(\d+\.)\s/gm, "<strong style='color: var(--primary-dark);'>$1</strong> ");

  // Split by newlines, wrap in styled paragraphs
  const lines = html.split('\n').filter(line => line.trim() !== "");
  
  const formattedLines = lines.map(line => {
    // If line starts with a number or strong number, give it slight padding
    const isListItem = /^(<strong[^>]*>)?\s*\d+\./.test(line);
    if (isListItem) {
      return `<p style="margin-bottom: 12px; padding-left: 10px; border-left: 3px solid var(--accent-gold); line-height: 1.6;">${line}</p>`;
    }
    return `<p style="margin-bottom: 12px; line-height: 1.6;">${line}</p>`;
  });

  return formattedLines.join("");
}

function stripMarkdown(text) {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1").replace(/__/g, "").replace(/_/g, "");
}

// Database of agricultural retail shops across Karnataka
const agriStoresDb = [
  {
    id: 1,
    nameEn: "Mandya Farmers Co-operative Marketing Society Ltd.",
    nameKn: "ಮಂಡ್ಯ ರೈತ ಸಹಕಾರ ಮಾರುಕಟ್ಟೆ ಸಂಘ",
    addressEn: "APMC Yard, Mandya Town",
    addressKn: "ಎ.ಪಿ.ಎಮ್.ಸಿ ಆವರಣ, ಮಂಡ್ಯ ನಗರ",
    district: "Mandya",
    lat: 12.5218,
    lon: 76.8973
  },
  {
    id: 2,
    nameEn: "Sri Manjunatha Fertilizer & Agro Chemicals",
    nameKn: "ಶ್ರೀ ಮಂಜುನಾಥ ಫರ್ಟಿಲೈಸರ್ & ಆಗ್ರೋ ಕೆಮಿಕಲ್ಸ್",
    addressEn: "M.C. Road, near Bus Stand, Mandya",
    addressKn: "ಎಂ.ಸಿ. ರಸ್ತೆ, ಬಸ್ ನಿಲ್ದಾಣದ ಹತ್ತಿರ, ಮಂಡ್ಯ",
    district: "Mandya",
    lat: 12.5275,
    lon: 76.8990
  },
  {
    id: 3,
    nameEn: "Government Raita Mitra Kendra (RSK) Mandya",
    nameKn: "ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಮಂಡ್ಯ",
    addressEn: "Kothathi Road, Mandya",
    addressKn: "ಕೊತ್ತತ್ತಿ ರಸ್ತೆ, ಮಂಡ್ಯ",
    district: "Mandya",
    lat: 12.5020,
    lon: 76.8745
  },
  {
    id: 4,
    nameEn: "Sri Srinivasa Agro Agencies",
    nameKn: "ಶ್ರೀ ಶ್ರೀನಿವಾಸ ಆಗ್ರೋ ಏಜೆನ್ಸೀಸ್",
    addressEn: "APMC Market Road, Kolar Town",
    addressKn: "ಎ.ಪಿ.ಎಮ್.ಸಿ ರಸ್ತೆ, ಕೋಲಾರ ನಗರ",
    district: "Kolar",
    lat: 13.1368,
    lon: 78.1356
  },
  {
    id: 5,
    nameEn: "Kolar Taluk Farmers Co-op Society",
    nameKn: "ಕೋಲಾರ ತಾಲೂಕು ರೈತ ಸಹಕಾರ ಸಂಘ",
    addressEn: "M.G. Road, Kolar",
    addressKn: "ಎಂ.ಜಿ. ರಸ್ತೆ, ಕೋಲಾರ",
    district: "Kolar",
    lat: 13.1390,
    lon: 78.1300
  },
  {
    id: 6,
    nameEn: "Mysore District Farmers Service Co-op Society",
    nameKn: "ಮೈಸೂರು ಜಿಲ್ಲಾ ರೈತ ಸೇವಾ ಸಹಕಾರ ಸಂಘ",
    addressEn: "Bandipalya APMC Yard, Mysuru",
    addressKn: "ಬಂಡಿಪಾಳ್ಯ ಎ.ಪಿ.ಎಮ್.ಸಿ ಆವರಣ, ಮೈಸೂರು",
    district: "Mysuru",
    lat: 12.2680,
    lon: 76.6690
  },
  {
    id: 7,
    nameEn: "Sri Chamundeshwari Agri Inputs",
    nameKn: "ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರಿ ಕೃಷಿ ಪರಿಕರಗಳು",
    addressEn: "Devaraja Market Building, Mysuru",
    addressKn: "ದೇವರಾಜ ಮಾರುಕಟ್ಟೆ ಕಟ್ಟಡ, ಮೈಸೂರು",
    district: "Mysuru",
    lat: 12.3115,
    lon: 76.6508
  },
  {
    id: 8,
    nameEn: "Sri Siddheshwara Fertilizer Depot",
    nameKn: "ಶ್ರೀ ಸಿದ್ದೇಶ್ವರ ಫರ್ಟಿಲೈಸರ್ ಡಿಪೋ",
    addressEn: "P.B. Road, Davanagere",
    addressKn: "ಪಿ.ಬಿ. ರಸ್ತೆ, ದಾವಣಗೆರೆ",
    district: "Davanagere",
    lat: 14.4644,
    lon: 75.9218
  },
  {
    id: 9,
    nameEn: "Davanagere District Farmers Co-op Union",
    nameKn: "ದಾವಣಗೆರೆ ಜಿಲ್ಲಾ ರೈತ ಸಹಕಾರ ಒಕ್ಕೂಟ",
    addressEn: "APMC Yard, Davanagere",
    addressKn: "ಎ.ಪಿ.ಎಮ್.ಸಿ ಆವರಣ, ದಾವಣಗೆರೆ",
    district: "Davanagere",
    lat: 14.4710,
    lon: 75.9290
  },
  {
    id: 10,
    nameEn: "Karnataka State Seeds Corporation Store",
    nameKn: "ಕರ್ನಾಟಕ ರಾಜ್ಯ ಬಿತ್ತನೆ ಬೀಜ ನಿಗಮ ನಿಯಮಿತ",
    addressEn: "Hebbal Main Road, Bengaluru",
    addressKn: "ಹೆಬ್ಬಾಳ ಮುಖ್ಯ ರಸ್ತೆ, ಬೆಂಗಳೂರು",
    district: "Bengaluru",
    lat: 13.0354,
    lon: 77.5978
  },
  {
    id: 11,
    nameEn: "Government Raita Kendra (RSK) Bengaluru",
    nameKn: "ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಬೆಂಗಳೂರು",
    addressEn: "Yeshwanthpur APMC Yard, Bengaluru",
    addressKn: "ಯಶವಂತಪುರ ಎ.ಪಿ.ಎಮ್.ಸಿ ಆವರಣ, ಬೆಂಗಳೂರು",
    district: "Bengaluru",
    lat: 13.0235,
    lon: 77.5501
  }
];

// Product price catalog
const productPricesDb = {
  "neem oil": { en: "Organic Neem Oil", kn: "ಬೇವಿನ ಎಣ್ಣೆ", priceEn: "₹180 / 500ml", priceKn: "₹180 / 500ಮಿಲಿ" },
  "copper oxychloride": { en: "Copper Oxychloride 50% WP", kn: "ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್", priceEn: "₹280 / 500g", priceKn: "₹280 / 500ಗ್ರಾಂ" },
  "pseudomonas": { en: "Pseudomonas fluorescens", kn: "ಸುಡೋಮೊನಾಸ್ ಬಯೋ-ಏಜೆಂಟ್", priceEn: "₹120 / 1kg bag", priceKn: "₹120 / 1ಕೆಜಿ ಚೀಲ" },
  "tricyclazole": { en: "Tricyclazole 75% WP (Blast Control)", kn: "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್", priceEn: "₹350 / 250g", priceKn: "₹350 / 250ಗ್ರಾಂ" },
  "kitazin": { en: "Kitazin (Iprobenfos 48% EC)", kn: "ಕೀಟಾಜಿನ್", priceEn: "₹390 / 500ml", priceKn: "₹390 / 500ಮಿಲಿ" },
  "mancozeb": { en: "Mancozeb 75% WP Fungicide", kn: "ಮ್ಯಾಂಕೊಜೆಬ್", priceEn: "₹220 / 500g", priceKn: "₹220 / 500ಗ್ರಾಂ" },
  "trichoderma": { en: "Trichoderma viride Bio-Fungicide", kn: "ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ", priceEn: "₹90 / 500g", priceKn: "₹90 / 500ಗ್ರಾಂ" },
  "copper hydroxide": { en: "Copper Hydroxide 53.8% DF", kn: "ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್", priceEn: "₹340 / 500g", priceKn: "₹340 / 500ಗ್ರಾಂ" },
  "propiconazole": { en: "Propiconazole 25% EC", kn: "ಪ್ರೊಪಿಕೊನಾಜೋಲ್", priceEn: "₹290 / 250ml", priceKn: "₹290 / 250ಮಿಲಿ" },
  "tebuconazole": { en: "Tebuconazole 250 EC", kn: "ಟೆಬುಕೊನಜೋಲ್", priceEn: "₹380 / 250ml", priceKn: "₹380 / 250ಮಿಲಿ" },
  "nitrogen": { en: "Nitrogen Fertilizer (Urea)", kn: "ಸಾರಜನಕ ಗೊಬ್ಬರ (ಯೂರಿಯಾ)", priceEn: "₹266.50 / 45kg bag", priceKn: "₹266.50 / 45ಕೆಜಿ ಚೀಲ" },
  "urea": { en: "Urea Fertilizer", kn: "ಯೂರಿಯಾ ಗೊಬ್ಬರ", priceEn: "₹266.50 / 45kg bag", priceKn: "₹266.50 / 45ಕೆಜಿ ಚೀಲ" },
  "potash": { en: "Muriate of Potash (MOP)", kn: "ಪೊಟ್ಯಾಶ್ ರಸಗೊಬ್ಬರ (MOP)", priceEn: "₹1,700 / 50kg bag", priceKn: "₹1,700 / 50ಕೆಜಿ ಚೀಲ" },
  "sulfur": { en: "Elemental Sulfur 80% WDG", kn: "ದ್ರವ ಗಂಧಕ", priceEn: "₹150 / 1kg", priceKn: "₹150 / 1ಕೆಜಿ" }
};

// Haversine distance calculator
function calcDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Scrapes text to find a matching product from our database
function detectRemedyProduct(resultText) {
  if (!resultText) return null;
  const normalized = resultText.toLowerCase();
  
  const keywords = [
    { key: "neem", dbKey: "neem oil" },
    { key: "ಬೇವಿನ", dbKey: "neem oil" },
    { key: "copper oxychloride", dbKey: "copper oxychloride" },
    { key: "ಆಕ್ಸಿಕ್ಲೋರೈಡ್", dbKey: "copper oxychloride" },
    { key: "pseudomonas", dbKey: "pseudomonas" },
    { key: "ಸುಡೋಮೊನಾಸ್", dbKey: "pseudomonas" },
    { key: "tricyclazole", dbKey: "tricyclazole" },
    { key: "ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್", dbKey: "tricyclazole" },
    { key: "kitazin", dbKey: "kitazin" },
    { key: "ಕೀಟಾಜಿನ್", dbKey: "kitazin" },
    { key: "mancozeb", dbKey: "mancozeb" },
    { key: "ಮ್ಯಾಂಕೊಜೆಬ್", dbKey: "mancozeb" },
    { key: "trichoderma", dbKey: "trichoderma" },
    { key: "ಟ್ರೈಕೋಡರ್ಮಾ", dbKey: "trichoderma" },
    { key: "hydroxide", dbKey: "copper hydroxide" },
    { key: "ಹೈಡ್ರಾಕ್ಸೈಡ್", dbKey: "copper hydroxide" },
    { key: "propiconazole", dbKey: "propiconazole" },
    { key: "ಪ್ರೊಪಿಕೊನಾಜೋಲ್", dbKey: "propiconazole" },
    { key: "tebuconazole", dbKey: "tebuconazole" },
    { key: "ಟೆಬುಕೊನಜೋಲ್", dbKey: "tebuconazole" },
    { key: "nitrogen", dbKey: "nitrogen" },
    { key: "urea", dbKey: "urea" },
    { key: "ಯೂರಿಯಾ", dbKey: "urea" },
    { key: "potash", dbKey: "potash" },
    { key: "ಪೊಟ್ಯಾಶ್", dbKey: "potash" },
    { key: "sulfur", dbKey: "sulfur" },
    { key: "ಗಂಧಕ", dbKey: "sulfur" }
  ];

  for (const item of keywords) {
    if (normalized.includes(item.key)) {
      return productPricesDb[item.dbKey];
    }
  }
  return null;
}

// Renders dynamic store list
function generateStoreSuggestions(detectedItem) {
  if (!dom.storeSuggestionsContainer) return;
  
  const dict = translations[state.lang];
  const userLat = state.userLocation.lat || 12.5218;
  const userLon = state.userLocation.lon || 76.8973;
  const isGPS = state.userLocation.isGPSActive;

  // Set Location Source Pill Text
  if (dom.lblLocationSource) {
    if (isGPS) {
      dom.lblLocationSource.textContent = dict.gpsActive || "GPS Active";
      dom.lblLocationSource.style.background = "rgba(16, 185, 129, 0.15)";
      dom.lblLocationSource.style.color = "#047857";
    } else {
      const displayCity = state.userLocation.city || "Mandya";
      dom.lblLocationSource.textContent = `${dict.profileLocationFallback || "Profile fallback"}: ${displayCity}`;
      dom.lblLocationSource.style.background = "rgba(245, 158, 11, 0.15)";
      dom.lblLocationSource.style.color = "#d97706";
    }
  }

  // Calculate distances for all stores in DB and sort
  const scoredStores = agriStoresDb.map(store => {
    const dist = calcDistanceKm(userLat, userLon, store.lat, store.lon);
    return { ...store, distance: dist };
  });

  // Sort by distance
  scoredStores.sort((a, b) => a.distance - b.distance);

  // Take top 3 nearest stores
  const nearestStores = scoredStores.slice(0, 3);

  // Render stores
  let containerHtml = "";
  if (nearestStores.length === 0) {
    containerHtml = `<p style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 10px;">${dict.noStoresFound || "No stores found."}</p>`;
  } else {
    // Default fallback item if undetected
    const activeItem = detectedItem || productPricesDb["copper oxychloride"];
    const prodName = state.lang === "kn" ? activeItem.kn : activeItem.en;
    const prodPrice = state.lang === "kn" ? activeItem.priceKn : activeItem.priceEn;

    nearestStores.forEach(store => {
      const storeName = state.lang === "kn" ? store.nameKn : store.nameEn;
      const storeAddress = state.lang === "kn" ? store.addressKn : store.addressEn;
      const distanceText = `${store.distance.toFixed(1)} km`;

      containerHtml += `
        <div class="store-item-card" style="background: rgba(255,255,255,0.45); border: 1px solid var(--border-color); padding: 14px; border-radius: var(--radius-sm); display: flex; flex-direction: column; gap: 8px; transition: all 0.3s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
          <div style="display: flex; justify-content: space-between; align-items: start; gap: 10px;">
            <h5 style="margin: 0; font-size: 13px; font-weight: 800; color: var(--primary-dark); line-height: 1.4;">${storeName}</h5>
            <span style="font-size: 10px; font-weight: 800; color: #0284c7; background: rgba(56,189,248,0.15); padding: 2px 6px; border-radius: 4px; white-space: nowrap;">${distanceText}</span>
          </div>
          <p style="margin: 0; font-size: 11px; color: var(--text-muted); line-height: 1.3;">
            ${storeAddress}
          </p>
          
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; font-size: 11px;">
            <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.15); padding: 3px 8px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
              <strong style="color: var(--primary-dark);">${dict.itemLabel}:</strong> <span style="font-weight: 600;">${prodName}</span>
            </div>
            <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.15); padding: 3px 8px; border-radius: 4px; display: flex; align-items: center; gap: 4px;">
              <strong style="color: var(--accent-clay);">${dict.priceLabel}:</strong> <span style="font-weight: 700; color: var(--primary-dark);">${prodPrice}</span>
            </div>
          </div>
          
          <a href="https://www.google.com/maps/search/?api=1&query=${store.lat},${store.lon}" target="_blank" class="btn btn-accent w-full" style="padding: 6px 12px; font-size: 11px; font-weight:700; margin-top: 5px; text-decoration: none; text-align: center; display: flex; justify-content: center; align-items: center; gap: 5px; border-radius:6px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
            ${dict.getDirections}
          </a>
        </div>
      `;
    });
  }
  dom.storeSuggestionsContainer.innerHTML = containerHtml;
}

function renderDiseaseResults(result) {
  state.currentDiseaseAnalysis = result;
  
  dom.resCropName.textContent = result.crop;
  dom.resDiseaseName.textContent = result.disease;
  
  // Set severity visual badge
  dom.resSeverity.textContent = translations[state.lang][result.severity.toLowerCase()] || result.severity;
  dom.resSeverity.className = `severity-gauge ${result.severity.toLowerCase()}`;
  
  // Use formatMarkdownText and innerHTML to render points cleanly
  dom.resCauses.innerHTML = formatMarkdownText(result.causes);
  dom.resOrganic.innerHTML = formatMarkdownText(result.organic);
  dom.resChemical.innerHTML = formatMarkdownText(result.chemical);
  dom.resPrevention.innerHTML = formatMarkdownText(result.prevention);

  // Generate nearest stores & prices based on crop remedies
  const organicProduct = detectRemedyProduct(result.organic);
  const chemicalProduct = detectRemedyProduct(result.chemical);
  const fullText = `${result.organic} ${result.chemical} ${result.causes} ${result.prevention}`.toLowerCase();
  
  let detectedItem = null;
  if (fullText.includes("nitrogen") || fullText.includes("urea") || fullText.includes("ಯೂರಿಯಾ") || fullText.includes("ಸಾರಜನಕ")) {
    detectedItem = productPricesDb["urea"];
  } else {
    detectedItem = chemicalProduct || organicProduct || productPricesDb["copper oxychloride"];
  }
  
  generateStoreSuggestions(detectedItem);

  dom.resultPlaceholder.style.display = "none";
  dom.resultBox.style.display = "block";

  // Trigger full voice read out auto-prompt alert
  const dict = translations[state.lang];
  const completionText = `${dict.scanDone}. ${dict.cropType}: ${result.crop}. ${dict.detectedDisease}: ${result.disease}.`;
  
  // Create a comprehensive readout
  const fullReadout = `${completionText} ` + 
    `${dict.diseaseCauses}: ${stripMarkdown(result.causes)}. ` + 
    `${dict.biologicalTreatment}: ${stripMarkdown(result.organic)}. ` + 
    `${dict.chemicalTreatment}: ${stripMarkdown(result.chemical)}. ` + 
    `${dict.preventiveMeasures}: ${stripMarkdown(result.prevention)}.`;

  if (typeof speakText === "function") {
    speakText(fullReadout, state.lang);
  }
}

// Narration controls
dom.voiceReadoutBtn.addEventListener("click", () => {
  if (!state.currentDiseaseAnalysis) return;
  
  const res = state.currentDiseaseAnalysis;
  const dict = translations[state.lang];
  
  const textToSpeak = `
    ${dict.cropType}: ${res.crop}.
    ${dict.detectedDisease}: ${res.disease}.
    ${dict.severity}: ${dict[res.severity.toLowerCase()] || res.severity}.
    
    ${dict.diseaseCauses}:
    ${res.causes}
    
    ${dict.biologicalTreatment}:
    ${res.organic}
    
    ${dict.preventiveMeasures}:
    ${res.prevention}
  `;

  dom.voiceReadoutBtn.style.display = "none";
  dom.stopVoiceBtn.style.display = "inline-flex";
  
  speakText(textToSpeak, state.lang).then(() => {
    dom.stopVoiceBtn.style.display = "none";
    dom.voiceReadoutBtn.style.display = "inline-flex";
  }).catch(() => {
    dom.stopVoiceBtn.style.display = "none";
    dom.voiceReadoutBtn.style.display = "inline-flex";
  });
});

dom.stopVoiceBtn.addEventListener("click", () => {
  stopSpeaking();
  dom.stopVoiceBtn.style.display = "none";
  dom.voiceReadoutBtn.style.display = "inline-flex";
});

// ==========================================
// 5. LIVE MANDI PRICES SYSTEM
// ==========================================

function renderMandiPrices() {
  const prices = getMandiPrices(state.lang);
  dom.mandiTableBody.innerHTML = "";

  // Dynamic filter sets
  const filtered = prices.filter(item => {
    const cropMatches = !state.selectedMandiCropFilter || item.cropId === state.selectedMandiCropFilter;
    const marketMatches = !state.selectedMandiMarketFilter || item.marketId === state.selectedMandiMarketFilter;
    
    const query = state.mandiSearchQuery.toLowerCase();
    const searchMatches = !query || 
      item.cropName.toLowerCase().includes(query) || 
      item.marketName.toLowerCase().includes(query);

    return cropMatches && marketMatches && searchMatches;
  });

  filtered.forEach(item => {
    const tr = document.createElement("tr");
    tr.className = "table-row-hover";
    if (state.activeMandiCrop === item.cropId) {
      tr.classList.add("selected-row");
    }

    // Row selection update chart
    tr.addEventListener("click", () => {
      state.activeMandiCrop = item.cropId;
      renderMandiPrices(); // updates visual row highlights
      drawTrendChart();
    });

    const isUp = item.isUp;
    const changeSymbol = isUp ? "&uarr;" : "&darr;";
    const changeClass = isUp ? "up" : "down";

    tr.innerHTML = `
      <td>${item.cropName}</td>
      <td>${item.marketName}</td>
      <td class="price-cell">₹${item.price.toLocaleString()}</td>
      <td>
        <span class="trend-badge ${changeClass}">
          ${changeSymbol} ${item.changePercent}%
        </span>
      </td>
    `;
    dom.mandiTableBody.appendChild(tr);
  });
}

function updateMandiTickerTape() {
  const prices = getMandiPrices(state.lang);
  let tickerHtml = "";

  // Slice random 5 items
  const sampled = prices.sort(() => 0.5 - Math.random()).slice(0, 5);
  sampled.forEach(item => {
    const symbol = item.isUp ? "&uarr;" : "&darr;";
    const color = item.isUp ? "#2e7d32" : "#c62828";
    tickerHtml += `
      <span style="margin-right:30px;">
        ${item.cropName} (${item.marketName}): 
        <strong style="color:${color};">₹${item.price}</strong> 
        <span style="color:${color}; font-size:11px;">(${symbol} ${item.changePercent}%)</span>
      </span>
    `;
  });
  dom.mandiTickerTape.innerHTML = tickerHtml;
}

/**
 * Renders dynamic SVG graph plots showing weekly pricing movements
 */
function drawTrendChart() {
  const crop = cropsList.find(c => c.id === state.activeMandiCrop);
  if (!crop) return;

  const history = getCropHistory(state.activeMandiCrop);
  const avg = getAverageCropPrice(state.activeMandiCrop);

  // Update summary badge
  const dict = translations[state.lang];
  dom.mandiAvgPriceVal.textContent = `₹${avg.toLocaleString()} / ${dict.rupeesPerQuintal}`;
  document.getElementById("lbl-priceHistoryHeader").textContent = `${state.lang === "kn" ? crop.kn : crop.en} - ${dict.priceHistoryHeader}`;

  // SVG dimensions: 400 width, 200 height.
  // Set bounds: padding-left = 40, padding-bottom = 30
  const width = 400;
  const height = 200;
  const paddingX = 50;
  const paddingY = 30;

  const minVal = Math.min(...history) * 0.98;
  const maxVal = Math.max(...history) * 1.02;
  const valRange = maxVal - minVal;

  const points = [];
  const spacing = (width - paddingX - 20) / 6;

  for (let i = 0; i < 7; i++) {
    const x = paddingX + (i * spacing);
    const relativeVal = (history[i] - minVal) / valRange;
    const y = height - paddingY - (relativeVal * (height - paddingY - 20));
    points.push({ x, y, val: history[i] });
  }

  // Draw elements
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
  }

  let svgContent = `
    <!-- Grid helper lines -->
    <line x1="${paddingX}" y1="${height - paddingY}" x2="${width - 10}" y2="${height - paddingY}" stroke="var(--border-color)" stroke-width="1"></line>
    <line x1="${paddingX}" y1="20" x2="${paddingX}" y2="${height - paddingY}" stroke="var(--border-color)" stroke-width="1"></line>
  `;

  // Draw trend line
  svgContent += `<path d="${pathD}" fill="none" stroke="var(--primary)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path>`;

  // Draw points and labels
  points.forEach((p, idx) => {
    svgContent += `
      <circle cx="${p.x}" cy="${p.y}" r="5" fill="var(--accent-gold-light)" stroke="var(--primary)" stroke-width="2"></circle>
      <text x="${p.x}" y="${p.y - 10}" font-size="10" font-family="var(--font-display)" font-weight="700" fill="var(--text-main)" text-anchor="middle">₹${p.val}</text>
    `;
    
    // X Axis days (Day 1 - Day 7)
    const dayLabel = state.lang === "kn" ? `ದಿನ ${idx + 1}` : `Day ${idx + 1}`;
    svgContent += `
      <text x="${p.x}" y="${height - 10}" font-size="9" fill="var(--text-muted)" text-anchor="middle">${dayLabel}</text>
    `;
  });

  dom.mandiSvgChart.innerHTML = svgContent;
}

// ==========================================
// 6. PEER TO PEER MARKETPLACE
// ==========================================

function renderMarketplaceListings() {
  dom.listingsGrid.innerHTML = "";
  const dict = translations[state.lang];

  if (state.listings.length === 0) {
    dom.listingsGrid.innerHTML = `
      <div class="card-wrapper text-center w-full" style="grid-column: 1 / -1;">
        <p>${dict.noActiveListings}</p>
      </div>
    `;
    return;
  }

  state.listings.forEach(item => {
    const crop = cropsList.find(c => c.id === item.cropId);
    if (!crop) return;

    const avgPrice = getAverageCropPrice(item.cropId);
    const isOrganic = item.isOrganic;
    
    // Evaluate if price is within fair range (±6% of Mandi averages)
    const percentDiff = ((item.price - avgPrice) / avgPrice) * 100;
    
    let adviceClass = "good";
    let adviceText = dict.fairPriceGood;
    
    if (percentDiff > 6) {
      adviceClass = "high";
      adviceText = dict.fairPriceHigh;
    } else if (percentDiff < -6) {
      adviceClass = "low";
      adviceText = dict.fairPriceLow;
    }

    const card = document.createElement("div");
    card.className = "listing-card";
    card.innerHTML = `
      <div class="listing-badge-row">
        <span class="harvest-tag">${state.lang === "kn" ? crop.kn : crop.en}</span>
        ${isOrganic ? `<span class="trend-badge up" style="font-size:10px;">${state.lang === "kn" ? "ಸಾವಯವ" : "Organic"}</span>` : ""}
      </div>
      
      <h3 style="font-size:18px; margin: 5px 0;">${item.variety}</h3>
      <p style="font-size:13px;"><strong>${state.lang === "kn" ? "ಪ್ರಮಾಣ" : "Quantity"}:</strong> ${item.quantity} ${state.lang === "kn" ? "ಕ್ವಿಂಟಾಲ್" : "Quintals"}</p>
      <p style="font-size:13px;"><strong>${state.lang === "kn" ? "ಸ್ಥಳ" : "Location"}:</strong> ${item.location}</p>
      
      <div class="price-cell" style="font-size:20px; color:var(--primary-dark); margin: 5px 0;">
        ₹${item.price.toLocaleString()} <span style="font-size:12px; font-weight:500; color:var(--text-muted);">/ ${state.lang === "kn" ? "ಕ್ವಿಂಟಾಲ್" : "Quintal"}</span>
      </div>

      <div class="price-advisor-alert ${adviceClass}">
        ${adviceText}
      </div>

      <div style="display:flex; gap:10px; margin-top:10px;">
        <a href="tel:${item.contact}" class="btn btn-secondary w-full text-center" style="text-decoration:none;">
          ${dict.callFarmer}
        </a>
        <a href="https://wa.me/91${item.contact}?text=Hello,%20I%20am%20interested%20in%20your%20listing%20for%20${crop.en}" target="_blank" class="btn btn-primary w-full text-center" style="text-decoration:none;">
          ${dict.chatBuyer}
        </a>
      </div>
    `;
    dom.listingsGrid.appendChild(card);
  });
}

// Marketplace interactive Listing Price calculations
dom.sellPriceInput.addEventListener("input", () => {
  const cropId = dom.sellCropSelect.value;
  const expected = parseFloat(dom.sellPriceInput.value);

  if (!cropId || isNaN(expected) || expected <= 0) {
    dom.marketplaceFairAdvisor.style.display = "none";
    return;
  }

  const avgPrice = getAverageCropPrice(cropId);
  const percentDiff = ((expected - avgPrice) / avgPrice) * 100;
  const dict = translations[state.lang];

  dom.marketplaceFairAdvisor.style.display = "block";
  if (percentDiff > 6) {
    dom.marketplaceFairAdvisor.className = "price-advisor-alert high mt-4";
    dom.fairAdvisorText.textContent = dict.fairPriceHigh;
  } else if (percentDiff < -6) {
    dom.marketplaceFairAdvisor.className = "price-advisor-alert low mt-4";
    dom.fairAdvisorText.textContent = dict.fairPriceLow;
  } else {
    dom.marketplaceFairAdvisor.className = "price-advisor-alert good mt-4";
    dom.fairAdvisorText.textContent = dict.fairPriceGood;
  }
});

dom.sellHarvestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const cropId = dom.sellCropSelect.value;
  const variety = document.getElementById("sell-variety").value;
  const qty = parseFloat(document.getElementById("sell-qty").value);
  const price = parseFloat(dom.sellPriceInput.value);
  const location = document.getElementById("sell-location").value;
  const phone = document.getElementById("sell-phone").value;

  const newListing = {
    id: state.listings.length + 1,
    cropId,
    variety,
    quantity: qty,
    price,
    location,
    contact: phone,
    isOrganic: Math.random() > 0.4 // randomize organic tag for demo listings
  };

  // Insert to top of array
  state.listings.unshift(newListing);

  // Clear form
  dom.sellHarvestForm.reset();
  dom.marketplaceFairAdvisor.style.display = "none";

  // Visual success alert
  alert(translations[state.lang].listingAddedSuccess);

  // Switch back to Buy tab view
  dom.tabBuy.click();
});

// ==========================================
// 7. SOIL NPK HEALTH ADVISOR CALCULATIONS
// ==========================================

dom.calculateSoilBtn.addEventListener("click", () => {
  const soilType = dom.soilTypeSelect.value;
  const n = parseInt(dom.soilN.value);
  const p = parseInt(dom.soilP.value);
  const k = parseInt(dom.soilK.value);
  const ph = parseFloat(dom.soilPH.value);

  // Target optimal values
  const targetN = 140;
  const targetP = 60;
  const targetK = 100;

  let deficient = false;
  let fertilizerAdvice = [];
  let organicAdvice = [];
  let suitableCrops = [];

  // 1. Evaluate Nitrogen
  if (n < targetN * 0.8) {
    deficient = true;
    fertilizerAdvice.push(state.lang === "kn" 
      ? "ಸಾರಜನಕ ಕೊರತೆ: ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದ ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡಿ (ಪ್ರತಿ ಎಕರೆಗೆ ಸುಮಾರು ೪೦ ಕೆಜಿ)." 
      : "Nitrogen Deficient: Apply recommended Urea fertilizer (approx 40kg per acre) during vegetative stage.");
    organicAdvice.push(state.lang === "kn" 
      ? "ಸಾವಯವ: ಗ್ಲಿರಿಸಿಡಿಯಾ ಹಸಿರೆಲೆ ಗೊಬ್ಬರ ಅಥವಾ ಕಾಂಪೋಸ್ಟ್ ಸೇರಿಸಿ. ಬೇವು ಹಿಂಡಿ ಮಣ್ಣಿಗೆ ಹಾಕಿ." 
      : "Organic: Mix Glyricidia green manure, leaf compost, or Neem cake powder into soil.");
  } else {
    fertilizerAdvice.push(state.lang === "kn" ? "ಸಾರಜನಕ ಮಟ್ಟ ತೃಪ್ತಿಕರವಾಗಿದೆ." : "Nitrogen levels are healthy.");
  }

  // 2. Evaluate Phosphorus
  if (p < targetP * 0.8) {
    deficient = true;
    fertilizerAdvice.push(state.lang === "kn" 
      ? "ರಂಜಕ ಕೊರತೆ: ಸಿಂಗಲ್ ಸೂಪರ್ ಫಾಸ್ಫೇಟ್ (SSP) ಅಥವಾ ಡಿ.ಎ.ಪಿ ಗೊಬ್ಬರವನ್ನು ಬಿತ್ತನೆ ವೇಳೆ ಮಣ್ಣಿಗೆ ಸೇರಿಸಿ." 
      : "Phosphorus Deficient: Apply Single Super Phosphate (SSP) or DAP directly to soil before sowing.");
    organicAdvice.push(state.lang === "kn" 
      ? "ಸಾವಯವ: ರಾಕ್ ಫಾಸ್ಫೇಟ್ ಜೊತೆಗೆ ರಂಜಕ ಕರಗಿಸುವ ಬ್ಯಾಕ್ಟೀರಿಯಾ (PSB) ಜೈವಿಕ ಗೊಬ್ಬರ ಬಳಸಿ." 
      : "Organic: Use rock phosphate combined with Phosphate Solubilizing Bacteria (PSB) bio-agent.");
  } else {
    fertilizerAdvice.push(state.lang === "kn" ? "ರಂಜಕ ಮಟ್ಟ ಸಮರ್ಪಕವಾಗಿದೆ." : "Phosphorus levels are optimal.");
  }

  // 3. Evaluate Potassium
  if (k < targetK * 0.8) {
    deficient = true;
    fertilizerAdvice.push(state.lang === "kn" 
      ? "ಪೊಟ್ಯಾಸಿಯಮ್ ಕೊರತೆ: ಎಂ.ಓ.ಪಿ (MOP - Muriate of Potash) ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಸಿಂಪಡಿಸಿ." 
      : "Potassium Deficient: Apply Muriate of Potash (MOP) to improve stalk strength and disease defense.");
    organicAdvice.push(state.lang === "kn" 
      ? "ಸಾವಯವ: ಮರದ ಬೂದಿಯನ್ನು (Wood Ash) ಒದ್ದೆ ಮಣ್ಣಿಗೆ ಬೆರೆಸಿ. ಹಸಿರೆಲೆ ಕಾಂಪೋಸ್ಟ್ ಬಳಸಿ." 
      : "Organic: Mix wood ash (rich in potassium) into compost beds.");
  } else {
    fertilizerAdvice.push(state.lang === "kn" ? "ಪೊಟ್ಯಾಸಿಯಮ್ ಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ." : "Potassium levels are robust.");
  }

  // 4. Crop suitability recommendations based on pH and Soil Texture
  if (ph >= 6.0 && ph <= 7.0) {
    if (soilType === "red") {
      suitableCrops = state.lang === "kn" 
        ? ["ರಾಗಿ (ಮುಖ್ಯ)", "ನೆಲಗಡಲೆ (ಶೇಂಗಾ)", "ತೊಗರಿ", "ಹರಳು"] 
        : ["Ragi (Primary)", "Groundnut", "Pigeon Pea", "Castor Seed"];
    } else if (soilType === "black") {
      suitableCrops = state.lang === "kn" 
        ? ["ಭತ್ತ (ಹತ್ತಿ)", "ಸೂರ್ಯಕಾಂತಿ", "ಜೋಳ", "ಕಡಲೆ"] 
        : ["Cotton (Paddy)", "Sunflower", "Sorghum (Jowar)", "Chickpea"];
    } else {
      suitableCrops = state.lang === "kn" 
        ? ["ತರಕಾರಿಗಳು", "ಟೊಮೆಟೊ", "ಹೂಕೋಸು", "ಮೆಕ್ಕೆಜೋಳ"] 
        : ["Vegetables", "Tomato", "Chilli", "Maize"];
    }
  } else if (ph < 6.0) {
    suitableCrops = state.lang === "kn" 
      ? ["ರಾಗಿ (ಆಮ್ಲೀಯ ನಿರೋಧಕ)", "ಕಾಫಿ", "ಟೀ", "ಆಲೂಗಡ್ಡೆ"] 
      : ["Ragi (Acid tolerant)", "Coffee", "Tea", "Potato"];
    organicAdvice.push(state.lang === "kn" 
      ? "ಆಮ್ಲೀಯತೆ ತಡೆ: ಹೆಚ್ಚಿದ ಆಮ್ಲೀಯತೆ ಕಡಿಮೆ ಮಾಡಲು ಕೃಷಿ ಸುಣ್ಣ (Agricultural Lime/Dolomite) ಬಳಸಿ." 
      : "pH Correction: Apply agricultural lime (dolomite) to sweeten acidic soils.");
  } else {
    suitableCrops = state.lang === "kn" 
      ? ["ಕಬ್ಬು (ಕ್ಷಾರ ನಿರೋಧಕ)", "ಹತ್ತಿ", "ಜೋಳ"] 
      : ["Sugarcane (Alkali tolerant)", "Cotton", "Barley"];
    organicAdvice.push(state.lang === "kn" 
      ? "ಕ್ಷಾರತೆ ತಡೆ: ಹೆಚ್ಚಿದ ಲವಣಾಂಶ ತಗ್ಗಿಸಲು ಜಿಪ್ಸಮ್ (Gypsum) ಪುಡಿಯನ್ನು ನೀರಾವರಿ ಜೊತೆ ನೀಡಿ." 
      : "pH Correction: Add gypsum powder to treat sodic alkaline soils.");
  }

  // Render report
  dom.soilPlaceholder.style.display = "none";
  dom.soilReport.style.display = "grid";

  // Badging status
  const badge = dom.soilStatusBadge;
  if (deficient) {
    badge.textContent = translations[state.lang].soilStatusDeficient;
    badge.className = "advisor-status-badge deficient";
  } else {
    badge.textContent = translations[state.lang].soilStatusGood;
    badge.className = "advisor-status-badge balanced";
  }

  dom.soilRecCrops.textContent = suitableCrops.join(", ");
  dom.soilRecFertilizers.innerHTML = fertilizerAdvice.map(a => `&bull; ${a}<br>`).join("");
  dom.soilRecOrganic.innerHTML = organicAdvice.map(a => `&bull; ${a}<br>`).join("");

  // Speak out NPK status summary aloud
  const readout = state.lang === "kn" 
    ? `ಮಣ್ಣಿನ ವರದಿ ಸಿದ್ಧವಾಗಿದೆ. ನಿಮ್ಮ ಮಣ್ಣಿಗೆ ಸೂಕ್ತ ಬೆಳೆಗಳು: ${suitableCrops[0]} ಮತ್ತು ${suitableCrops[1] || ""}.`
    : `Soil health analysis is complete. Most suitable crop is ${suitableCrops[0]}.`;
  speakText(readout, state.lang);
});

// ==========================================
// 8. GOVERNMENT SCHEMES ACCORDION
// ==========================================

function renderSchemes() {
  try {
    const searchVal = dom.schemeSearchInput ? dom.schemeSearchInput.value.toLowerCase().trim() : "";
    const currentLang = state.lang === "kn" ? "kn" : "en";
    const schemes = (schemesData && schemesData[currentLang]) ? schemesData[currentLang] : [];
    
    if (!dom.schemesAccordionContainer) return;
    dom.schemesAccordionContainer.innerHTML = "";

    const dict = (translations && translations[currentLang]) ? translations[currentLang] : translations["en"];

    const filtered = schemes.filter(s => {
      if (!searchVal) return true;
      const t = s.title ? s.title.toLowerCase() : "";
      const sub = s.subtitle ? s.subtitle.toLowerCase() : "";
      const desc = s.description ? s.description.toLowerCase() : "";
      return t.includes(searchVal) || sub.includes(searchVal) || desc.includes(searchVal);
    });

    if (filtered.length === 0) {
      dom.schemesAccordionContainer.innerHTML = `<p style="text-align:center; padding: 20px; color: #666;">No schemes found.</p>`;
      return;
    }

    filtered.forEach(s => {
      const item = document.createElement("div");
      item.className = "accordion-item";
      item.style.display = "block"; // Force display just in case

      const header = document.createElement("div");
      header.className = "accordion-header";
      header.innerHTML = `
        <div>
          <h3>${s.title || "Scheme"}</h3>
          <p>${s.subtitle || ""}</p>
        </div>
        <span>&plus;</span>
      `;

      const content = document.createElement("div");
      content.className = "accordion-content";
      
      // Handle arrays safely
      const eligibilityList = Array.isArray(s.eligibility) ? s.eligibility : [];
      const benefitsList = Array.isArray(s.benefits) ? s.benefits : [];
      const applyStepsList = Array.isArray(s.applySteps) ? s.applySteps : [];
      
      content.innerHTML = `
        <div class="scheme-section">
          <p style="margin-bottom:15px; font-weight:500;">${s.description || ""}</p>
        </div>

        <div class="scheme-section">
          <h4>${dict.schemeEligibility || "Eligibility"}</h4>
          <ul>
            ${eligibilityList.map(e => `<li>${e}</li>`).join("")}
          </ul>
        </div>

        <div class="scheme-section">
          <h4>${dict.schemeBenefits || "Benefits"}</h4>
          <ul>
            ${benefitsList.map(b => `<li>${b}</li>`).join("")}
          </ul>
        </div>

        <div class="scheme-section">
          <h4>${dict.schemeApply || "How to Apply"}</h4>
          <ul>
            ${applyStepsList.map(step => `<li>${step}</li>`).join("")}
          </ul>
        </div>

        <div class="scheme-section" style="margin-bottom:0;">
          <a href="${s.link || "#"}" target="_blank" class="btn btn-secondary" style="font-size:12px; padding:6px 12px;">
            ${dict.schemeLink || "Official Link"} &rarr;
          </a>
        </div>
      `;

      // Accordion expand trigger
      header.addEventListener("click", () => {
        const isVisible = content.style.display === "block";
        
        // Collapse other items
        document.querySelectorAll(".accordion-content").forEach(el => el.style.display = "none");
        document.querySelectorAll(".accordion-header span").forEach(el => el.innerHTML = "&plus;");

        if (isVisible) {
          content.style.display = "none";
          header.querySelector("span").innerHTML = "&plus;";
        } else {
          content.style.display = "block";
          header.querySelector("span").innerHTML = "&minus;";
          
          // Narration support
          if (typeof speakText === "function") {
            speakText(`${s.title}. ${s.subtitle}`, state.lang);
          }
        }
      });

      item.appendChild(header);
      item.appendChild(content);
      dom.schemesAccordionContainer.appendChild(item);
    });
  } catch (error) {
    console.error("Error rendering schemes:", error);
    if (dom.schemesAccordionContainer) {
      dom.schemesAccordionContainer.innerHTML = `<p style="color:red; text-align:center;">Failed to load schemes.</p>`;
    }
  }
}

// ==========================================
// 9. CHATBOT AND REAL-TIME EXPERT PORTAL
// ==========================================

function renderChatbotQuickReplies() {
  dom.chatQuickTags.innerHTML = "";
  
  const quickQuestions = state.lang === "kn"
    ? ["ರಾಗಿ ಬೆಂಕಿ ರೋಗ", "ಟೊಮೆಟೊ ಚುಕ್ಕೆ", "ಮಣ್ಣಿನ ಗೊಬ್ಬರ", "ಮಂಡಿ ದರ"]
    : ["Tomato Blight", "Ragi Blast", "Organic Fertilizer", "Check Mandi"];

  quickQuestions.forEach(q => {
    const span = document.createElement("span");
    span.className = "reply-tag";
    span.textContent = q;
    span.addEventListener("click", () => {
      dom.chatInput.value = q;
      handleChatbotSend();
    });
    dom.chatQuickTags.appendChild(span);
  });
}

async function handleChatbotSend() {
  const query = dom.chatInput.value.trim();
  if (!query) return;

  // Render User Bubble
  renderChatBubble(query, "user");
  dom.chatInput.value = "";

  // Auto-scroll
  dom.chatBody.scrollTop = dom.chatBody.scrollHeight;

  // Typing state bubble
  const typingBubble = renderChatBubble("...", "bot");

  try {
    const response = await getChatbotResponse(query, state.lang, state.apiKey);
    
    // Remove typing bubble and render text
    typingBubble.remove();
    const botBubble = renderChatBubble(response.text, "bot");
    
    // Speak out chatbot response
    speakText(response.text, state.lang);

  } catch (err) {
    console.error(err);
    typingBubble.remove();
    renderChatBubble(state.lang === "kn" ? "ಕ್ಷಮಿಸಿ, ಪ್ರತಿಕ್ರಿಯಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ." : "Sorry, I am facing server issues responding.", "bot");
  }

  dom.chatBody.scrollTop = dom.chatBody.scrollHeight;
}

function renderChatBubble(text, sender) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.textContent = text;
  dom.chatBody.appendChild(bubble);
  return bubble;
}

// ==========================================
// 10. INTERACTION AND DOM LISTENERS BINDING
// ==========================================

function setupEventListeners() {
  // Brand Logo home link redirection
  dom.brandHome.addEventListener("click", () => window.switchPanel("home"));

  // Toggle Language Click
  dom.langBtn.addEventListener("click", toggleLanguage);

  // Toggle Theme Clicks
  dom.themeBtn.addEventListener("click", () => {
    const nextTheme = state.theme === "light" ? "dark" : "light";
    state.theme = nextTheme;
    localStorage.setItem("krishi_theme", nextTheme);
    applyTheme(nextTheme);
  });

  // Settings Panel redirection
  dom.settingsBtn.addEventListener("click", () => window.switchPanel("settings"));

  // Floating Microphones triggers
  dom.floatingMic.addEventListener("click", toggleVoiceRecognition);
  dom.voicePill.addEventListener("click", toggleVoiceRecognition);
  dom.closeVoiceBtn.addEventListener("click", deactivateVoiceOverlay);

  // Bind click listeners for crop selector chips
  document.querySelectorAll(".crop-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".crop-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.activeCropScan = chip.dataset.crop;
    });
  });

  // Mandi Prices search and filter controls
  dom.mandiSearch.addEventListener("input", (e) => {
    state.mandiSearchQuery = e.target.value;
    renderMandiPrices();
  });
  dom.mandiMarketFilter.addEventListener("change", (e) => {
    state.selectedMandiMarketFilter = e.target.value;
    renderMandiPrices();
  });
  dom.mandiCropFilter.addEventListener("change", (e) => {
    state.selectedMandiCropFilter = e.target.value;
    renderMandiPrices();
  });

  // Marketplace tab toggles
  dom.tabBuy.addEventListener("click", () => {
    dom.tabBuy.classList.add("active");
    dom.tabSell.classList.remove("active");
    dom.marketBuySection.style.display = "block";
    dom.marketSellSection.style.display = "none";
    state.marketplaceTab = "buy";
    renderMarketplaceListings();
  });

  dom.tabSell.addEventListener("click", () => {
    dom.tabSell.classList.add("active");
    dom.tabBuy.classList.remove("active");
    dom.marketBuySection.style.display = "none";
    dom.marketSellSection.style.display = "block";
    state.marketplaceTab = "sell";
  });

  // Soil health inputs triggers to change visual numbers in labels
  dom.soilN.addEventListener("input", (e) => { dom.soilNVal.textContent = `${e.target.value} kg/ha`; });
  dom.soilP.addEventListener("input", (e) => { dom.soilPVal.textContent = `${e.target.value} kg/ha`; });
  dom.soilK.addEventListener("input", (e) => { dom.soilKVal.textContent = `${e.target.value} kg/ha`; });
  dom.soilPH.addEventListener("input", (e) => {
    const v = parseFloat(e.target.value);
    let desc = "";
    if (v < 5.5) desc = state.lang === "kn" ? "ಆಮ್ಲೀಯ ಮಣ್ಣು (Strongly Acidic)" : "Acidic";
    else if (v < 6.5) desc = state.lang === "kn" ? "ಸಾಧಾರಣ ಆಮ್ಲೀಯ (Slightly Acidic)" : "Slightly Acidic";
    else if (v <= 7.5) desc = state.lang === "kn" ? "ತಟಸ್ಥ ಮಣ್ಣು (Neutral)" : "Neutral";
    else desc = state.lang === "kn" ? "ಕ್ಷಾರೀಯ ಮಣ್ಣು (Alkaline)" : "Alkaline";
    dom.soilPHVal.textContent = `${v} (${desc})`;
  });

  // Govt schemes search input
  dom.schemeSearchInput.addEventListener("input", renderSchemes);

  // Settings saving parameters
  dom.saveSettingsBtn.addEventListener("click", () => {
    const newKey = dom.settingsApiKey.value.trim();
    state.apiKey = newKey;
    localStorage.setItem("krishi_gemini_api_key", newKey);
    alert(translations[state.lang].apiSavedMsg);
    translateDOM();
    window.switchPanel("home");
  });

  dom.themeLightBtn.addEventListener("click", () => {
    state.theme = "light";
    localStorage.setItem("krishi_theme", "light");
    applyTheme("light");
  });
  dom.themeDarkBtn.addEventListener("click", () => {
    state.theme = "dark";
    localStorage.setItem("krishi_theme", "dark");
    applyTheme("dark");
  });

  // Floating Chatbot window expand
  dom.chatbotTrigger.addEventListener("click", () => {
    const isVisible = dom.chatbotWindow.style.display === "flex";
    if (isVisible) {
      dom.chatbotWindow.style.display = "none";
      stopSpeaking();
    } else {
      dom.chatbotWindow.style.display = "flex";
      renderChatbotQuickReplies();
      dom.chatInput.focus();
      // Narrate greeting
      speakText(translations[state.lang].botIntro, state.lang);
    }
  });

  dom.closeChat.addEventListener("click", () => {
    dom.chatbotWindow.style.display = "none";
    stopSpeaking();
  });

  dom.sendChatBtn.addEventListener("click", handleChatbotSend);
  dom.chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleChatbotSend();
  });

  // Digital Twin Config inputs
  if (dom.twinLandSizeInput) {
    dom.twinLandSizeInput.addEventListener("input", (e) => {
      const dict = translations[state.lang];
      const unitAc = dict.unitAc || "ac";
      dom.twinLandSizeDisplay.textContent = `${e.target.value} ${unitAc}`;
    });
  }

  if (dom.twinConfigForm) {
    dom.twinConfigForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applyTwinConfigUpdates();
    });
  }
}

function toggleLanguage() {
  const nextLang = state.lang === "en" ? "kn" : "en";
  state.lang = nextLang;
  localStorage.setItem("krishi_lang", nextLang);
  
  // Re-translate interface
  translateDOM();
  renderChatbotQuickReplies();

  // Force re-calculation/re-rendering of inputs immediately to ensure 100% localization
  const inputEvent = new Event("input");
  dom.soilN.dispatchEvent(inputEvent);
  dom.soilP.dispatchEvent(inputEvent);
  dom.soilK.dispatchEvent(inputEvent);
  dom.soilPH.dispatchEvent(inputEvent);
  dom.sellPriceInput.dispatchEvent(inputEvent);

  // If soil report is currently visible, recalculate in the new language
  if (dom.soilReport && dom.soilReport.style.display === "grid") {
    dom.calculateSoilBtn.click();
  }

  // If a disease analysis has run and is in the result box, re-render it in the new language
  if (state.currentDiseaseAnalysis && dom.resultBox.style.display === "block") {
    if (state.currentDiseaseAnalysis.isMock) {
      let cropId = null;
      const currentCropName = state.currentDiseaseAnalysis.crop;
      if (currentCropName === "Tomato" || currentCropName === "ಟೊಮೆಟೊ") cropId = "tomato";
      else if (currentCropName === "Rice (Paddy)" || currentCropName === "ಭತ್ತ (ಅಕ್ಕಿ)") cropId = "rice";
      else if (currentCropName === "Ragi (Finger Millet)" || currentCropName === "ರಾಗಿ") cropId = "ragi";
      else if (currentCropName === "Onion" || currentCropName === "ಈರುಳ್ಳಿ") cropId = "onion";
      else if (currentCropName === "Corn (Maize)" || currentCropName === "ಮೆಕ್ಕೆಜೋಳ (ಜೋಳ)") cropId = "corn";
      
      if (cropId) {
        analyseCropDisease(null, null, state.lang, "", "", cropId).then(newResult => {
          renderDiseaseResults(newResult);
        });
      }
    }
  }
}

// ==========================================
// 9. DIGITAL TWIN SIMULATOR IMPLEMENTATION
// ==========================================

function initTwin() {
  if (!dom.twinBoard3D) return;
  syncTwinInputsFromState();
  recalculateTwinStats();
  render3DFarmReplica();
}

function syncTwinInputsFromState() {
  if (dom.twinLandSizeInput) {
    dom.twinLandSizeInput.value = state.twin.landSize;
    const dict = translations[state.lang];
    const unitAc = dict.unitAc || "ac";
    dom.twinLandSizeDisplay.textContent = `${state.twin.landSize} ${unitAc}`;
  }
  if (dom.twinPrimaryCropSelect) dom.twinPrimaryCropSelect.value = state.twin.primaryCrop;
  if (dom.twinIrrigationSelect) dom.twinIrrigationSelect.value = state.twin.irrigation;
  if (dom.twinClimateSelect) dom.twinClimateSelect.value = state.twin.climate;
}

function applyTwinConfigUpdates() {
  state.twin.landSize = parseFloat(dom.twinLandSizeInput.value);
  state.twin.primaryCrop = dom.twinPrimaryCropSelect.value;
  state.twin.irrigation = dom.twinIrrigationSelect.value;
  state.twin.climate = dom.twinClimateSelect.value;

  recalculateTwinStats();
  render3DFarmReplica();
}

function recalculateTwinStats() {
  const twin = state.twin;
  
  // Dynamic base factors
  let baseYield = 70; // sugarcane
  let basePrice = 160;
  let baseCost = 650;
  
  if (twin.primaryCrop === "wheat") {
    baseYield = 2.2;
    basePrice = 260;
    baseCost = 350;
  } else if (twin.primaryCrop === "sweet_potato") {
    baseYield = 7.0;
    basePrice = 480;
    baseCost = 500;
  }
  
  let climateFactor = 1.0;
  if (twin.climate === "humid") {
    climateFactor = twin.primaryCrop === "sugarcane" ? 1.15 : (twin.primaryCrop === "wheat" ? 0.75 : 0.85);
  } else if (twin.climate === "dry") {
    climateFactor = twin.primaryCrop === "sugarcane" ? 0.7 : (twin.primaryCrop === "wheat" ? 0.8 : 0.6);
  } else {
    // temperate
    climateFactor = twin.primaryCrop === "sugarcane" ? 0.9 : (twin.primaryCrop === "wheat" ? 1.25 : 1.1);
  }

  let irrigationFactor = 1.0;
  if (twin.irrigation === "drip") irrigationFactor = 1.18;
  else if (twin.irrigation === "canal") irrigationFactor = 1.0;
  else if (twin.irrigation === "borewell") irrigationFactor = 0.96;
  else if (twin.irrigation === "rainfed") irrigationFactor = 0.55;

  const totalYield = (twin.landSize * baseYield * climateFactor * irrigationFactor).toFixed(1);
  const revenue = Math.round(totalYield * basePrice);
  
  let costPerAcre = baseCost;
  if (twin.irrigation === "drip") costPerAcre += 100;
  else if (twin.irrigation === "borewell") costPerAcre += 120;
  else if (twin.irrigation === "canal") costPerAcre += 60;
  
  const totalCosts = Math.round(twin.landSize * costPerAcre);
  const netProfit = revenue - totalCosts;

  // Update Overview Labels
  const dict = translations[state.lang];
  const unitAc = dict.unitAc || "ac";
  const unitTons = dict.unitTons || "Tons";
  const unitWater = dict.unitWater || "L/s";

  dom.twinAcreageBadge.textContent = `${twin.landSize} ${unitAc}`;
  dom.twinOverviewYield.textContent = `${totalYield} ${unitTons}`;
  
  const waterFlow = twin.irrigation === "rainfed" ? "0.0" : (twin.landSize * 0.4).toFixed(1);
  dom.twinOverviewWater.textContent = `${waterFlow} ${unitWater}`;
  
  const profitSign = netProfit >= 0 ? `₹${netProfit.toLocaleString()}` : `-₹${Math.abs(netProfit).toLocaleString()}`;
  dom.twinOverviewProfit.textContent = profitSign;
}

function render3DFarmReplica() {
  const twin = state.twin;
  dom.twinBoard3D.innerHTML = "";
  
  // Set board size layout - grid cells
  const gridCells = [
    { id: 1, type: twin.primaryCrop },
    { id: 2, type: twin.primaryCrop },
    { id: 3, type: "wheat" },
    { id: 4, type: twin.primaryCrop },
    { id: 5, type: "sweet_potato" },
    { id: 6, type: "sweet_potato" },
    { id: 7, type: "wheat" },
    { id: 8, type: "sweet_potato" },
    { id: 9, type: twin.primaryCrop }
  ];

  const stalksPerCell = twin.landSize > 20 ? 9 : (twin.landSize > 8 ? 6 : 4);

  gridCells.forEach(cell => {
    const cellEl = document.createElement("div");
    cellEl.className = "farm-cell";
    cellEl.setAttribute("data-cell-id", cell.id);
    cellEl.setAttribute("data-crop-type", cell.type);
    
    const stalksContainer = document.createElement("div");
    stalksContainer.className = "crop-stalks-field";
    
    let cropClass = "sugarcane-plant";
    if (cell.type === "wheat") cropClass = "wheat-plant";
    if (cell.type === "sweet_potato") cropClass = "potato-plant";
    
    for (let s = 0; s < stalksPerCell; s++) {
      const plant = document.createElement("div");
      plant.className = `crop-plant standup-3d ${cropClass}`;
      stalksContainer.appendChild(plant);
    }
    
    cellEl.appendChild(stalksContainer);
    dom.twinBoard3D.appendChild(cellEl);
  });

  // Render canals
  if (twin.irrigation !== "rainfed") {
    const canalH = document.createElement("div");
    canalH.className = "irrigation-canal-grid canal-horizontal";
    const canalV = document.createElement("div");
    canalV.className = "irrigation-canal-grid canal-vertical";
    
    dom.twinBoard3D.appendChild(canalH);
    dom.twinBoard3D.appendChild(canalV);
  }

  // Render AI Shed
  if (twin.irrigation !== "rainfed") {
    const station = document.createElement("div");
    station.className = "ai-control-station standup-3d";
    station.innerHTML = `
      <div class="shed-3d"></div>
    `;
    dom.twinBoard3D.appendChild(station);
  }

  // Render Tractor
  const tractor = document.createElement("div");
  tractor.className = "tractor-unit standup-3d";
  tractor.innerHTML = `<div class="tractor-3d"></div>`;
  dom.twinBoard3D.appendChild(tractor);

  // Render central sensor node
  const sensorTower = document.createElement("div");
  sensorTower.className = "sensor-tower standup-3d";
  sensorTower.innerHTML = `
    <div class="tower-3d"></div>
    <div class="pulse-wave-ring"></div>
  `;
  dom.twinBoard3D.appendChild(sensorTower);

  setupTwinHoverListeners();
}

function setupTwinHoverListeners() {
  const cells = dom.twinBoard3D.querySelectorAll(".farm-cell");
  
  cells.forEach(cell => {
    cell.addEventListener("mouseenter", () => {
      const cellId = cell.getAttribute("data-cell-id");
      const cropType = cell.getAttribute("data-crop-type");
      showTwinTooltip(cell, cellId, cropType);
    });
    
    cell.addEventListener("mouseleave", () => {
      hideTwinTooltip();
    });
  });
}

function showTwinTooltip(cellEl, cellId, cropType) {
  const twin = state.twin;
  
  // Crop detailed metrics
  let nameEn = "Sugarcane";
  let nameKn = "ಕಬ್ಬು";
  let statusEn = "Maturing";
  let statusKn = "ಪಕ್ವವಾಗುತ್ತಿದೆ";
  let baseYield = 70;
  let price = 160;
  let cost = 650;
  
  if (cropType === "wheat") {
    nameEn = "Wheat";
    nameKn = "ಗೋಧಿ";
    statusEn = "Vegetative";
    statusKn = "ಬೆಳವಣಿಗೆ ಹಂತ";
    baseYield = 2.2;
    price = 260;
    cost = 350;
  } else if (cropType === "sweet_potato") {
    nameEn = "Sweet Potato";
    nameKn = "ಗೆಣಸು";
    statusEn = "Sprouting";
    statusKn = "ಮೊಳಕೆಯೊಡೆಯುತ್ತಿದೆ";
    baseYield = 7.0;
    price = 480;
    cost = 500;
  }

  const zoneAcreage = (twin.landSize / 9).toFixed(1);
  
  let climateFactor = 1.0;
  if (twin.climate === "humid") {
    climateFactor = cropType === "sugarcane" ? 1.15 : (cropType === "wheat" ? 0.75 : 0.85);
  } else if (twin.climate === "dry") {
    climateFactor = cropType === "sugarcane" ? 0.7 : (cropType === "wheat" ? 0.8 : 0.6);
  } else {
    climateFactor = cropType === "sugarcane" ? 0.9 : (cropType === "wheat" ? 1.25 : 1.1);
  }

  const dict = translations[state.lang];
  const unitAc = dict.unitAc || "ac";
  const unitTons = dict.unitTons || "Tons";
  const unitWater = dict.unitWater || "L/s";

  const zoneYield = (zoneAcreage * baseYield * climateFactor).toFixed(1);
  const zoneWater = twin.irrigation === "rainfed" ? `0.0 ${unitWater}` : `${(twin.landSize * 0.4 / 9).toFixed(2)} ${unitWater}`;
  const zoneProfit = Math.round((zoneYield * price) - (zoneAcreage * cost));
  
  dom.twinTTCropBadge.textContent = state.lang === "kn" ? nameKn : nameEn;
  dom.twinTTStatusBadge.textContent = state.lang === "kn" ? statusKn : statusEn;
  dom.twinTTCropVal.textContent = state.lang === "kn" ? nameKn : nameEn;
  dom.twinTTAcreageVal.textContent = `${zoneAcreage} ${unitAc}`;
  dom.twinTTYieldVal.textContent = `${zoneYield} ${unitTons}`;
  dom.twinTTWaterVal.textContent = zoneWater;
  
  const profitSign = zoneProfit >= 0 ? `+₹${zoneProfit.toLocaleString()}` : `-₹${Math.abs(zoneProfit).toLocaleString()}`;
  dom.twinTTProfitVal.textContent = profitSign;
  if (zoneProfit >= 0) {
    dom.twinTTProfitVal.className = "val text-green";
  } else {
    dom.twinTTProfitVal.className = "val text-red";
  }

  const viewportRect = dom.twinBoard3D.parentElement.getBoundingClientRect();
  const cellRect = cellEl.getBoundingClientRect();
  
  const left = cellRect.left - viewportRect.left + (cellRect.width / 2) - 110;
  const top = cellRect.top - viewportRect.top - 145; // float above cell
  
  dom.twinTooltip.style.left = `${left}px`;
  dom.twinTooltip.style.top = `${top}px`;
  dom.twinTooltip.style.opacity = "1";
  dom.twinTooltip.style.transform = "translateY(0) scale(1)";
}

function hideTwinTooltip() {
  dom.twinTooltip.style.opacity = "0";
  dom.twinTooltip.style.transform = "translateY(20px) scale(0.9)";
}
