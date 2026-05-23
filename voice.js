// Krishi-Sanjeevini Web Speech Synthesis & Recognition Services

let synth = window.speechSynthesis;
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let currentUtterance = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
}

function findVoice(langCode) {
  if (!synth) return null;
  const voices = synth.getVoices();
  
  const prefix = langCode.split("-")[0].toLowerCase();
  
  // 1. Try to find native matching voices (e.g. kn-IN)
  let matchingVoices = voices.filter(v => v.lang.toLowerCase() === langCode.toLowerCase() || v.lang.toLowerCase().startsWith(prefix));
  
  if (matchingVoices.length > 0) {
    // 2. Prefer high-quality/neural South Indian voices over older robotic ones
    const premiumVoice = matchingVoices.find(v => 
      v.name.toLowerCase().includes("natural") || 
      v.name.toLowerCase().includes("online") || 
      v.name.toLowerCase().includes("gagan") || 
      v.name.toLowerCase().includes("shruti") || 
      v.name.toLowerCase().includes("google")
    );
    return premiumVoice || matchingVoices[0];
  }

  // 3. Special fallbacks
  if (prefix === "kn") {
    // Look for any Indian voice as alternative fallback
    const indianVoice = voices.find(v => v.lang.toLowerCase().includes("in"));
    return indianVoice || voices[0];
  }
  return voices[0];
}

export function transliterateKannada(text) {
  const consonants = {
    'ಕ': 'k', 'ಖ': 'kh', 'ಗ': 'g', 'ಘ': 'gh', 'ಙ': 'ng',
    'ಚ': 'ch', 'ಛ': 'chh', 'ಜ': 'j', 'ಝ': 'jh', 'ಞ': 'ny',
    'ಟ': 't', 'ಠ': 'th', 'ಡ': 'd', 'ಢ': 'dh', 'ಣ': 'n',
    'ತ': 't', 'ಥ': 'th', 'ದ': 'd', 'ಧ': 'dh', 'ನ': 'n',
    'ಪ': 'p', 'ಫ': 'ph', 'ಬ': 'b', 'ಭ': 'bh', 'ಮ': 'm',
    'ಯ': 'y', 'ರ': 'r', 'ಲ': 'l', 'ವ': 'v', 'ಶ': 'sh',
    'ಷ': 'sh', 'ಸ': 's', 'ಹ': 'h', 'ಳ': 'l', 'ಕ್ಷ': 'ksh'
  };
  const vowels = {
    'ಅ': 'a', 'ಆ': 'aa', 'ಇ': 'i', 'ಈ': 'ee', 'ಉ': 'u', 'ಊ': 'oo', 'ಋ': 'ru', 'ಎ': 'e', 'ಏ': 'ee', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'o', 'ಔ': 'au'
  };
  const vowelSigns = {
    'ಾ': 'aa', 'ಿ': 'i', 'ೀ': 'ee', 'ು': 'u', 'ೂ': 'oo', 'ೃ': 'ru', 'ೆ': 'e', 'ೇ': 'ee', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'o', 'ೌ': 'au', 'ಂ': 'm', 'ಃ': 'h'
  };
  
  let result = '';
  let i = 0;
  while (i < text.length) {
    const char = text[i];
    if (consonants[char]) {
      let base = consonants[char];
      let nextChar = text[i + 1];
      if (nextChar === '್') {
        result += base; i += 2;
      } else if (nextChar === 'ಂ' || nextChar === 'ಃ') {
        result += base + 'a' + vowelSigns[nextChar]; i += 2;
      } else if (vowelSigns[nextChar]) {
        result += base + vowelSigns[nextChar]; i += 2;
      } else {
        result += base + 'a'; i += 1;
      }
    } else if (vowels[char]) {
      result += vowels[char]; i += 1;
    } else {
      result += char; i += 1;
    }
  }
  
  // Custom corrections for common agricultural phrases to optimize pronunciation
  return result
    .replace(/\bragi\b/gi, 'raagi')
    .replace(/\broga\b/gi, 'rooga')
    .replace(/\bbele\b/gi, 'bele')
    .replace(/\bmannu\b/gi, 'mannu')
    .replace(/\bkrushi\b/gi, 'krushi')
    .replace(/\bsethu\b/gi, 'sethu');
}

let audioQueue = [];
let currentAudio = null;
let isPlayingAudioQueue = false;
let audioResolve = null;
let audioReject = null;

/**
 * Splits text into safe pronunciation chunks under standard limits
 */
function splitTextIntoChunks(text, maxLength = 160) {
  const chunks = [];
  const sentences = text.split(/([.?!,;|।\n]+)/);
  let currentChunk = "";

  for (let i = 0; i < sentences.length; i++) {
    const part = sentences[i];
    if (!part) continue;

    if ((currentChunk + part).length > maxLength) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = part;
      while (currentChunk.length > maxLength) {
        let cutIndex = currentChunk.lastIndexOf(" ", maxLength);
        if (cutIndex === -1) cutIndex = maxLength;
        chunks.push(currentChunk.substring(0, cutIndex).trim());
        currentChunk = currentChunk.substring(cutIndex);
      }
    } else {
      currentChunk += part;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

/**
 * Plays the next chunk prioritizing high-quality native Web Speech over Google TTS.
 */
function playNextQueueItem() {
  if (!isPlayingAudioQueue || audioQueue.length === 0) {
    isPlayingAudioQueue = false;
    if (audioResolve) {
      audioResolve();
      audioResolve = null;
      audioReject = null;
    }
    return;
  }

  const { text, lang } = audioQueue.shift();
  
  const voiceLang = lang === "kn" ? "kn-IN" : "en-IN";
  const bestVoice = findVoice(voiceLang);
  const hasNative = bestVoice && bestVoice.lang.toLowerCase().startsWith(lang);

  // Use Native Web Speech directly chunk-by-chunk to avoid Chrome 15s timeout
  // AND because modern OS voices (like Windows Natural voices) sound 10x better than old Google TTS API
  if (hasNative) {
    speakWithWebSpeech(text, lang)
      .then(() => {
        playNextQueueItem();
      })
      .catch((err) => {
        console.error("Web Speech chunk failed, trying Google TTS:", err);
        fallbackToGoogleTTS(text, lang);
      });
  } else {
    // If no native voice, fallback to old API
    fallbackToGoogleTTS(text, lang);
  }
}

/**
 * Legacy Google TTS fallback
 */
function fallbackToGoogleTTS(text, lang) {
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&ttsspeed=1&q=${encodeURIComponent(text)}`;
  
  currentAudio = new Audio(ttsUrl);
  
  const playTimeout = setTimeout(() => {
    console.warn("TTS Playback timed out.");
    if (currentAudio) {
      try { currentAudio.pause(); } catch (e) {}
      currentAudio = null;
    }
    playNextQueueItem();
  }, 4000);

  currentAudio.play()
    .then(() => {
      clearTimeout(playTimeout);
      if (!currentAudio) return;
      currentAudio.onended = () => {
        currentAudio = null;
        playNextQueueItem();
      };
      currentAudio.onerror = () => {
        currentAudio = null;
        playNextQueueItem();
      };
    })
    .catch(() => {
      clearTimeout(playTimeout);
      currentAudio = null;
      playNextQueueItem();
    });
}

/**
 * Native SpeechSynthesis fallback for offline or blocked requests
 */
function fallbackToWebSpeech(text, lang) {
  isPlayingAudioQueue = false;
  const remainingText = text + " " + audioQueue.map(item => item.text).join(" ");
  audioQueue = [];
  
  speakWithWebSpeech(remainingText, lang)
    .then(() => {
      if (audioResolve) {
        audioResolve();
        audioResolve = null;
        audioReject = null;
      }
    })
    .catch((err) => {
      if (audioReject) {
        audioReject(err);
        audioResolve = null;
        audioReject = null;
      }
    });
}

/**
 * Standard SpeechSynthesis speaker
 */
function speakWithWebSpeech(text, lang = "en") {
  return new Promise((resolve, reject) => {
    if (!synth) {
      reject("Speech Synthesis not supported in this browser.");
      return;
    }
    
    let targetText = text;
    let voiceLang = lang === "kn" ? "kn-IN" : "en-IN";

    const hasNativeKannada = synth.getVoices().some(v => v.lang.toLowerCase().startsWith("kn"));
    if (lang === "kn" && !hasNativeKannada) {
      // If there is no native Kannada voice, silently resolve to prevent reading Kannada text 
      // with a broken English accent, which sounds very odd to the user.
      console.warn("No native Kannada voice found. Skipping Web Speech fallback to avoid odd pronunciation.");
      resolve();
      return;
    }

    currentUtterance = new SpeechSynthesisUtterance(targetText);
    currentUtterance.lang = voiceLang;

    const bestVoice = findVoice(voiceLang);
    if (bestVoice) {
      currentUtterance.voice = bestVoice;
    }

    currentUtterance.rate = lang === "kn" ? 0.85 : 1.0;
    currentUtterance.pitch = 1.05;

    currentUtterance.onend = () => {
      currentUtterance = null;
      resolve();
    };

    currentUtterance.onerror = (event) => {
      currentUtterance = null;
      reject(event.error);
    };

    synth.speak(currentUtterance);
  });
}

/**
 * Speaks out the provided text using sequential Google TTS streams (falling back to Web Speech Synthesis)
 */
export function speakText(text, lang = "en") {
  return new Promise((resolve, reject) => {
    stopSpeaking();

    const cleanText = text
      .replace(/[*#`_\-]/g, " ")
      .replace(/\d\./g, "")
      .trim();

    if (!cleanText) {
      resolve();
      return;
    }

    audioResolve = resolve;
    audioReject = reject;
    isPlayingAudioQueue = true;

    const chunks = splitTextIntoChunks(cleanText, 160);
    audioQueue = chunks.map(chunk => ({ text: chunk, lang }));

    playNextQueueItem();
  });
}

/**
 * Stops any ongoing narration (TTS streams or standard speech synthesis)
 */
export function stopSpeaking() {
  if (synth) {
    synth.cancel();
    currentUtterance = null;
  }
  isPlayingAudioQueue = false;
  audioQueue = [];
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.src = "";
    } catch (e) {
      console.error("Error pausing audio track:", e);
    }
    currentAudio = null;
  }
  if (audioResolve) {
    audioResolve();
    audioResolve = null;
    audioReject = null;
  }
}

// Bind stop functions globally to guarantee immediate halt when navigating or clicking Stop
window.stopAudioChunks = stopSpeaking;
window.stopSpeaking = stopSpeaking;

/**
 * Starts continuous or single speech-to-text recognition to capture farming commands
 */
export function startVoiceRecognition({ onResult, onEnd, onError, onStart, lang = "en" }) {
  if (!recognition) {
    if (onError) onError("Speech recognition is not supported in this browser. Use Chrome or Edge.");
    return null;
  }

  // Configure target language
  recognition.lang = lang === "kn" ? "kn-IN" : "en-IN";

  recognition.onstart = () => {
    if (onStart) onStart();
  };

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const speechResult = event.results[last][0].transcript;
    const confidence = event.results[last][0].confidence;
    console.log(`Voice Command Received: "${speechResult}" (Confidence: ${confidence})`);
    
    // Parse voice commands
    const command = parseVoiceCommand(speechResult, lang);
    if (onResult) onResult({ rawText: speechResult, command });
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  try {
    recognition.start();
  } catch (e) {
    console.warn("Recognition already active", e);
  }

  return recognition;
}

/**
 * Halts voice recording
 */
export function stopVoiceRecognition() {
  if (recognition) {
    recognition.stop();
  }
}

/**
 * Parses spoken inputs into standardized action commands in both English and Kannada
 */
function parseVoiceCommand(text, lang = "en") {
  const t = text.toLowerCase().trim();
  const wordCount = t.split(/\s+/).length;
  
  // If the user speaks a full sentence/question, route directly to AI Chatbot
  if (wordCount > 3) {
    return "unknown";
  }

  // English Navigation Command Map
  const enCommands = {
    home: ["home", "dashboard", "main screen", "welcome"],
    scan: ["scan", "disease", "camera", "crop diagnosis", "diagnose"],
    mandi: ["mandi", "price", "market", "rates", "cost"],
    buy: ["buy", "sell", "marketplace", "trade", "harvest listing"],
    weather: ["weather", "rain", "calendar", "forecast", "cloud"],
    soil: ["soil", "npk", "fertilizer", "mud"],
    schemes: ["scheme", "government", "subsidy", "benefit", "pm kisan"],
    chat: ["chat", "bot", "assistant", "ask ai", "krishi ai"],
    language: ["switch to kannada", "kannada language", "kannada please"],
    recycler: ["recycler", "waste", "recycle", "upcycle", "biogas"],
    hub: ["hub", "labor", "rental", "employment", "exchange", "machinery", "rent", "equipment"]
  };

  // Kannada Navigation Command Map
  const knCommands = {
    home: ["ಮುಖಪುಟ", "ಹೋಮ್", "ದರ್ಪಣ"],
    scan: ["ಸ್ಕ್ಯಾನ್", "ಖಾಯಿಲೆ", "ರೋಗ", "ಕ್ಯಾಮೆರಾ", "ಫೋಟೋ"],
    mandi: ["ಮಂಡಿ", "ಬೆಲೆ", "ಮಾರುಕಟ್ಟೆ", "ದರ", "ರೇಟ್"],
    buy: ["ಖರೀದಿ", "ಮಾರಾಟ", "ರೈತ ಮಾರುಕಟ್ಟೆ", "ವ್ಯಾಪಾರ"],
    weather: ["ಹವಾಮಾನ", "ಮಳೆ", "ಬಿಸಿಲು", "ಮುನ್ಸೂಚನೆ"],
    soil: ["ಮಣ್ಣು", "ಗೊಬ್ಬರ", "ತಪಾಸಣೆ"],
    schemes: ["ಯೋಜನೆ", "ಸರ್ಕಾರ", "ಸಹಾಯಧನ"],
    chat: ["ಚಾಟ್", "ಬಾಟ್", "ಸಹಾಯ", "ಪ್ರಶ್ನೆ"],
    language: ["ಇಂಗ್ಲಿಷ್", "ಸ್ವಿಚ್ ಟು ಇಂಗ್ಲಿಷ್", "english please"],
    recycler: ["ಮರುಬಳಕೆ", "ರಿಸೈಕ್ಲರ್", "ತ್ಯಾಜ್ಯ", "ಕಸ"],
    hub: ["ಕೂಲಿ", "ಬಾಡಿಗೆ", "ಹಬ್", "ಯಂತ್ರಗಳು", "ಬಾಡಿಗೆಗೆ"]
  };

  const commandMap = lang === "kn" ? knCommands : enCommands;

  // Direct exact match scan
  for (const [action, keywords] of Object.entries(commandMap)) {
    if (keywords.some(keyword => t.includes(keyword))) {
      return action;
    }
  }

  // Cross-lingual fallback checks
  const crossMap = lang === "kn" ? enCommands : knCommands;
  for (const [action, keywords] of Object.entries(crossMap)) {
    if (keywords.some(keyword => t.includes(keyword))) {
      // Swapping languages triggers
      if (action === "language") {
        return "language";
      }
      return action;
    }
  }

  return "unknown";
}

// Force synthesis voices to load on initialization
if (synth) {
  synth.getVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = () => synth.getVoices();
  }
}
export { SpeechRecognition };
