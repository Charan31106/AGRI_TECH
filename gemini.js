// Krishi-Sanjeevini Gemini AI Connection Service & High-Fidelity Mock Engine

// Database of high-fidelity agricultural diagnostics for Demo Mode
const mockDiagnostics = {
  tomato: {
    en: {
      crop: "Tomato",
      disease: "Early Blight (Alternaria solani)",
      severity: "Medium",
      causes: "Fungal infection caused by Alternaria solani. It thrives in warm, humid weather with frequent rain or overhead irrigation. Spores spread via wind, splashing water, or infested tools. Symptoms start as dark spots with concentric ring 'target' patterns on older leaves.",
      organic: "1. Spray Organic Neem Oil (1% concentration) thoroughly on leaves every 7-10 days.\n2. Apply baking soda spray (1 tablespoon baking soda, 1 tablespoon vegetable oil, and 2 drops liquid soap in 4 litres of water) to adjust leaf pH.\n3. Prune low-hanging branches and clear fallen debris to stop spore splashback.",
      chemical: "1. Apply copper-based fungicide (like Copper Oxychloride 50 WP at 3g/L of water) at the first sign of spot formation.\n2. In severe cases, spray Mancozeb or Chlorothalonil according to package instructions.",
      prevention: "1. Practice 3-year crop rotation (avoid planting peppers, potatoes, or eggplants in the same soil).\n2. Water at the base of the plant using drip irrigation; keep leaves completely dry.\n3. Ensure adequate spacing between tomato plants for optimal airflow."
    },
    kn: {
      crop: "ಟೊಮೆಟೊ",
      disease: "ಮುಂಚಿನ ಎಲೆ ಮಚ್ಚೆ ರೋಗ (Early Blight)",
      severity: "Medium",
      causes: "ಆಲ್ಟರ್ನೇರಿಯಾ ಸೊಲಾನಿ ಎಂಬ ಶಿಲೀಂಧ್ರದಿಂದ ಬರುತ್ತದೆ. ಇದು ಬೆಚ್ಚಗಿನ, ಆರ್ದ್ರ ಮತ್ತು ಅತಿಯಾದ ತೇವಾಂಶದ ವಾತಾವರಣದಲ್ಲಿ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ. ಹಳೆಯ ಎಲೆಗಳ ಮೇಲೆ ವೃತ್ತಾಕಾರದ ಕಪ್ಪು ಮಚ್ಚೆಗಳು ಮೊದಲು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ. ಗಾಳಿ ಮತ್ತು ನೀರಿನ ಹನಿಗಳ ಮೂಲಕ ಪಕ್ಕದ ಗಿಡಗಳಿಗೆ ಹರಡುತ್ತದೆ.",
      organic: "೧. ಶೇಕಡಾ ೧ ರಷ್ಟು ಸಾಂದ್ರತೆಯ ಬೇವಿನ ಎಣ್ಣೆಯನ್ನು ಎಲೆಗಳ ಮೇಲೆ ಪ್ರತಿ ೭-೧೦ ದಿನಗಳಿಗೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ.\n೨. ಅಡುಗೆ ಸೋಡಾ ಮಿಶ್ರಣವನ್ನು ಸಿಂಪಡಿಸಿ (೧ ಚಮಚ ಅಡುಗೆ ಸೋಡಾ, ೧ ಚಮಚ ಅಡುಗೆ ಎಣ್ಣೆ, ಕೆಲವು ಹನಿ ಲಿಕ್ವಿಡ್ ಸೋಪ್ ಅನ್ನು ೪ ಲೀಟರ್ ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ).\n೩. ಕೆಳಭಾಗದ ಒಣಗಿದ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ ಮತ್ತು ನೆಲದ ಮೇಲಿರುವ ಸಸ್ಯದ ತ್ಯಾಜ್ಯವನ್ನು ಸುಟ್ಟು ಹಾಕಿ.",
      chemical: "೧. ರೋಗದ ಆರಂಭಿಕ ಲಕ್ಷಣಗಳು ಕಂಡಾಗ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (Copper Oxychloride 50 WP) ಅನ್ನು ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ೩ ಗ್ರಾಂ ನಂತೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n೨. ತೀವ್ರವಾಗಿದ್ದರೆ ಮ್ಯಾಂಕೊಜೆಬ್ (Mancozeb) ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಸೂಕ್ತ ಪ್ರಮಾಣದಲ್ಲಿ ಸಿಂಪಡಿಸಿ.",
      prevention: "೧. ಮೂರು ವರ್ಷಗಳ ಬೆಳೆ ಸರದಿ ಪದ್ಧತಿಯನ್ನು ಅನುಸರಿಸಿ (ಟೊಮೆಟೊ ಜಾಗದಲ್ಲಿ ಆಲೂಗಡ್ಡೆ ಅಥವಾ ಬದನೆ ಬೆಳೆಯಬೇಡಿ).\n೨. ಗಿಡಗಳ ಬುಡಕ್ಕೆ ಮಾತ್ರ ನೀರು ಹಾಯಿಸಿ (ಹನಿ ನೀರಾವರಿ ಸೂಕ್ತ). ಎಲೆಗಳನ್ನು ಒಣದಾಗಿಡಿ.\n೩. ಗಿಡಗಳ ನಡುವೆ ಉತ್ತಮ ಗಾಳಿಯಾಡಲು ಸೂಕ್ತ ಅಂತರವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಿ."
    }
  },
  rice: {
    en: {
      crop: "Rice (Paddy)",
      disease: "Rice Blast (Magnaporthe oryzae)",
      severity: "High",
      causes: "One of the most destructive fungal diseases of rice. Thrives in cool daytime temperatures, high humidity, and heavy dew. It causes spindle-shaped (diamond) lesions with grey centers on leaves, and attacks nodes and panicles, leading to neck rot and severe grain loss.",
      organic: "1. Spray Pseudomonas fluorescens liquid formulation (10 ml per litre of water) to boost natural bacterial resistance.\n2. Apply fresh cow dung extract (diluted 1:10 with water) or vermicompost tea to suppress fungal spores.",
      chemical: "1. Spray Tricyclazole 75 WP at 0.6g per litre of water at the initiation of the disease.\n2. Alternatively, apply Azoxystrobin 25 SC (1 ml/L) or Carbendazim (1g/L) for rapid systemic control.",
      prevention: "1. Avoid excessive use of Nitrogen fertilizers, which makes leaf tissues soft and highly susceptible to blast.\n2. Use blast-resistant certified seed varieties.\n3. Clean the bunds and remove wild weed hosts surrounding the paddy field."
    },
    kn: {
      crop: "ಭತ್ತ (ಅಕ್ಕಿ)",
      disease: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Rice Blast)",
      severity: "High",
      causes: "ಮ್ಯಾಗ್ನಾಪೋರ್ತೆ ಒರೈಜೆ ಎಂಬ ಶಿಲೀಂಧ್ರದಿಂದ ಬರುವ ಅತ್ಯಂತ ವಿನಾಶಕಾರಿ ರೋಗ. ಇದು ಎಲೆಗಳ ಮೇಲೆ ವಜ್ರಾಕಾರದ (ಕಣ್ಣಿನ ಆಕಾರದ) ಬೂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ. ಇದು ಕುತ್ತಿಗೆ ಕೊಳೆತ ರೋಗಕ್ಕೂ ಕಾರಣವಾಗಿ ಜೊಳ್ಳು ಕಾಳುಗಳಾಗುವಂತೆ ಮಾಡುತ್ತದೆ.",
      organic: "೧. ಸುಡೋಮೊನಾಸ್ ಫ್ಲೋರೆಸೆನ್ಸ್ (Pseudomonas fluorescens) ದ್ರವ ರೂಪವನ್ನು (ಲೀಟರ್ ನೀರಿಗೆ ೧೦ ಮಿಲಿ) ಬೆರೆಸಿ ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.\n೨. ತಾಜಾ ಹಸುವಿನ ಸಗಣಿ ರಸವನ್ನು (೧:೧೦ ಪ್ರಮಾಣದಲ್ಲಿ ನೀರಿನೊಂದಿಗೆ ದುರ್ಬಲಗೊಳಿಸಿ) ಸೋಂಕಿತ ಬೆಳೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.\n೩. ಮಣ್ಣಿನ ಜೈವಿಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಹಸಿರೆಲೆ ಗೊಬ್ಬರ ಬಳಸಿ.",
      chemical: "೧. ರೋಗದ ಆರಂಭದಲ್ಲಿ ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ೭೫ ಡಬ್ಲ್ಯೂ.ಪಿ (Tricyclazole) ಅನ್ನು ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ೦.೬ ಗ್ರಾಂ ನಂತೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n೨. ಅಥವಾ ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ (Azoxystrobin 25 SC - ೧ ಮಿಲಿ/ಲೀಟರ್) ಬಳಸಿ ನಿಯಂತ್ರಿಸಿ.",
      prevention: "೧. ಸಾರಜನಕ (ಯೂರಿಯಾ) ಗೊಬ್ಬರವನ್ನು ಅತಿಯಾಗಿ ಬಳಸಬೇಡಿ, ಇದು ಎಲೆಗಳನ್ನು ಮೃದುವಾಗಿಸಿ ರೋಗಕ್ಕೆ ತುತ್ತಾಗಿಸುತ್ತದೆ.\n೨. ರೋಗ ನಿರೋಧಕ ಪ್ರಮಾಣೀಕೃತ ಬಿತ್ತನೆ ಬೀಜಗಳನ್ನು ಬಳಸಿ.\n೩. ಗದ್ದೆಯ ಬದುಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಟ್ಟುಕೊಂಡು ಪರ್ಯಾಯ ಕಳೆ ಸಸ್ಯಗಳನ್ನು ನಾಶಪಡಿಸಿ."
    }
  },
  ragi: {
    en: {
      crop: "Ragi (Finger Millet)",
      disease: "Finger Millet Leaf & Neck Blast (Pyricularia grisea)",
      severity: "Critical",
      causes: "Fungal pathogen that attacks finger millet at all growth stages. Spreads heavily under overcast skies, high humidity, and continuous light drizzles. Spindle lesions dry up leaf tips; neck blast chokes nutrient flow to the grain heads, leaving them completely dry, ash-colored, and empty.",
      organic: "1. Spray Neem Seed Kernel Extract (NSKE 5%) directly onto the developing crop.\n2. Dust wood ash mixed with turmeric on wet leaves in early morning.\n3. Treat seeds with Trichoderma viride bio-fungicide (4g/kg seed) before sowing.",
      chemical: "1. Spray Kitazin (Iprobenfos 48% EC) at 2 ml/L of water or Edifenphos at 1 ml/L of water.\n2. Ensure spraying is targeted at the neck and panicles when grains begin to emerge.",
      prevention: "1. Strictly maintain wider spacing between rows (30cm x 10cm) to keep the canopy dry.\n2. Apply recommended Potash (K) fertilizer, which strengthens the plant stalks.\n3. Remove and burn infected stubble post-harvest."
    },
    kn: {
      crop: "ರಾಗಿ",
      disease: "ರಾಗಿ ಕುತ್ತಿಗೆ ಮತ್ತು ತೆನೆ ಬೆಂಕಿ ರೋಗ (Ragi Blast)",
      severity: "Critical",
      causes: "ಪೈರಿಕ್ಯುಲೇರಿಯಾ ಗ್ರಿಸಿಯಾ ಎಂಬ ಶಿಲೀಂಧ್ರದಿಂದ ಬರುವ ರೋಗ. ಮೋಡ ಕವಿದ ವಾತಾವರಣ, ಅತಿ ತೇವಾಂಶ ಇದ್ದಾಗ ರೋಗ ತೀವ್ರವಾಗುತ್ತದೆ. ತೆನೆಗಳು ಬೆಳ್ಳಗಾಗಿ ಒಣಗಿ ನಿಲ್ಲುತ್ತವೆ ಮತ್ತು ಕಾಳುಗಳು ತುಂಬುವುದಿಲ್ಲ. ಇದರಿಂದ ಶೇಕಡಾ ೫೦ಕ್ಕೂ ಹೆಚ್ಚು ಇಳುವರಿ ನಷ್ಟವಾಗಬಹುದು.",
      organic: "೧. ಶೇಕಡಾ ೫ ರಷ್ಟು ಬೇವಿನ ಬೀಜದ ಹಿಂಡಿ ಕಷಾಯವನ್ನು (NSKE) ಬೆಳೆಗೆ ಸಿಂಪಡಿಸಿ.\n೨. ಮುಂಜಾನೆ ಇಬ್ಬನಿ ಇರುವಾಗ ಎಲೆಗಳ ಮೇಲೆ ಒಲೆ ಬೂದಿ ಮತ್ತು ಅರಿಶಿನ ಪುಡಿ ಮಿಶ್ರಣವನ್ನು ಧೂಳೀಕರಿಸಿ.\n೩. ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಬೀಜಗಳನ್ನು ಟ್ರೈಕೋಡರ್ಮಾ ವಿರಿಡೆ (Trichoderma viride - ೪ ಗ್ರಾಂ/ಕೆಜಿ) ಜೈವಿಕ ನಾಶಕದಿಂದ ಉಪಚರಿಸಿ.",
      chemical: "೧. ಕೀಟಾಜಿನ್ (Kitazin 48% EC) ಔಷಧವನ್ನು ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ೨ ಮಿಲಿ ಅಥವಾ ಎಡಿಫೆನ್‌ಫಾಸ್ ೧ ಮಿಲಿ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n೨. ತೆನೆಗಳು ಮೂಡುವ ಹಂತದಲ್ಲಿ ನೇರವಾಗಿ ತೆನೆಗಳ ಮೇಲೆ ಬೀಳುವಂತೆ ಸಿಂಪಡಿಸುವುದು ಅಗತ್ಯ.",
      prevention: "೧. ಬಿತ್ತನೆ ಮಾಡುವಾಗ ಸಾಲುಗಳ ನಡುವೆ ಕನಿಷ್ಠ ೩೦ ಸೆಂ.ಮೀ ಅಂತರ ಕಾಪಾಡಿಕೊಳ್ಳಿ.\n೨. ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರವನ್ನು ತಪ್ಪದೇ ನೀಡಿ, ಇದು ಕಾಂಡವನ್ನು ಗಟ್ಟಿಗೊಳಿಸುತ್ತದೆ.\n೩. ಕೊಯ್ಲಿನ ನಂತರ ಹಳೆಯ ರೋಗಗ್ರಸ್ತ ಕಡ್ಡಿಗಳನ್ನು ಹೊಲದಿಂದ ತೆಗೆದು ಸುಟ್ಟು ಹಾಕಿ."
    }
  },
  onion: {
    en: {
      crop: "Onion",
      disease: "Purple Blotch (Alternaria porri)",
      severity: "High",
      causes: "Fungal infection characterized by small, water-soaked lesions on leaves and seed stalks that rapidly turn purple-brown with yellow halos. It breaks the leaves, reducing onion bulb size and storage life. Favoured by warm temperatures (21-30°C) and persistent free moisture.",
      organic: "1. Apply fresh garlic-chilli extract spray (anti-fungal properties) once a week.\n2. Spray copper hydroxide (2.5g/L) which acts as an organic-compliant barrier.\n3. Improve soil drainage and avoid pooling water around onion beds.",
      chemical: "1. Spray Mancozeb 75 WP at 2.5g per litre or Propiconazole 25 EC at 1 ml per litre of water.\n2. Mix a sticking agent (spreader) in the chemical spray so the droplets stick to the waxy, slippery onion leaves.",
      prevention: "1. Avoid overhead sprinkler irrigation; always use drip or furrow systems.\n2. Maintain crop spacing to dry the leaf surfaces quickly.\n3. Apply balanced organic manure to improve overall crop immunity."
    },
    kn: {
      crop: "ಈರುಳ್ಳಿ",
      disease: "ನೇರಳೆ ಮಚ್ಚೆ ರೋಗ (Purple Blotch)",
      severity: "High",
      causes: "ಆಲ್ಟರ್ನೇರಿಯಾ ಪೋರಿ ಎಂಬ ಶಿಲೀಂಧ್ರದಿಂದ ಬರುವ ಪ್ರಮುಖ ರೋಗ. ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬಣ್ಣದ ಚುಕ್ಕೆಗಳು ಮೂಡಿ ನಂತರ ನೇರಳೆ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ. ಇದರಿಂದ ಎಲೆಗಳು ಒಣಗಿ ಮುರಿದು ಬೀಳುತ್ತವೆ ಮತ್ತು ಈರುಳ್ಳಿ ಗಡ್ಡೆಗಳ ಗಾತ್ರ ಹಾಗೂ ದಾಸ್ತಾನು ಸಾಮರ್ಥ್ಯ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
      organic: "೧. ಬೆಳ್ಳುಳ್ಳಿ ಮತ್ತು ಹಸಿಮೆಣಸಿನಕಾಯಿ ರಸದ ಕಷಾಯವನ್ನು ತಯಾರಿಸಿ ವಾರಕ್ಕೊಮ್ಮೆ ಸಿಂಪಡಿಸಿ.\n೨. ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್ (Copper Hydroxide) ಜೈವಿಕ ರಕ್ಷಕ ದ್ರಾವಣವನ್ನು ಸಿಂಪಡಿಸಿ.\n೩. ಈರುಳ್ಳಿ ಮಡಿಗಳಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಉತ್ತಮ ಬರಿದಾಗುವ ವ್ಯವಸ್ಥೆ ಮಾಡಿ.",
      chemical: "೧. ಮ್ಯಾಂಕೊಜೆಬ್ (Mancozeb) ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ೨.೫ ಗ್ರಾಂ ಅಥವಾ ಪ್ರೊಪಿಕೊನಾಜೋಲ್ (Propiconazole) ೧ ಮಿಲಿ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n೨. ಈರುಳ್ಳಿ ಎಲೆಗಳು ಮೇಣದಂತಿದ್ದು ಜಾರುವುದರಿಂದ, ಸಿಂಪಡಿಸುವ ದ್ರಾವಣಕ್ಕೆ ಗೋಂದು (Sticking Agent) ಸೇರಿಸುವುದು ಕಡ್ಡಾಯ.",
      prevention: "೧. ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿ ಪದ್ಧತಿ ಬಳಸಬೇಡಿ; ಸಾಲು ಕಾಲುವೆ ಅಥವಾ ಹನಿ ನೀರಾವರಿ ಸೂಕ್ತ.\n೨. ಎಲೆಗಳು ತೇವವಾಗಿ ಉಳಿಯದಂತೆ ಸಾಲುಗಳ ನಡುವೆ ಗರಿಷ್ಠ ಗಾಳಿಯಾಡುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.\n೩. ಉತ್ತಮ ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿಗಾಗಿ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರವನ್ನು ಸಮರ್ಪಕವಾಗಿ ಬಳಸಿ."
    }
  },
  corn: {
    en: {
      crop: "Corn (Maize)",
      disease: "Corn Common Rust (Puccinia sorghi)",
      severity: "Medium",
      causes: "Fungal infection caused by Puccinia sorghi. It is characterized by powdery, cinnamon-brown pustules on both upper and lower leaf surfaces. Favoured by cool temperatures, high relative humidity (above 95%), and free water on the leaves.",
      organic: "1. Apply organic Neem oil spray (1-2% concentration) or baking soda solution to leaves.\n2. Spray liquid sulfur or seaweed extract to strengthen corn stalk immunity.\n3. Clean the field by removing infected crop debris after harvest.",
      chemical: "1. Spray Mancozeb 75 WP (2g/L of water) or Tebuconazole (1 ml/L) for systemic rust control.\n2. Apply early when the first pustules appear to protect the yield.",
      prevention: "1. Plant resistant corn hybrid varieties.\n2. Ensure proper spacing for rapid leaf drying.\n3. Rotate crops with legumes (like beans or soy) to reduce pathogen load in soil."
    },
    kn: {
      crop: "ಮೆಕ್ಕೆಜೋಳ (ಜೋಳ)",
      disease: "ಮೆಕ್ಕೆಜೋಳದ ಸಾಧಾರಣ ತುಕ್ಕು ರೋಗ (Common Rust)",
      severity: "Medium",
      causes: "ಪುಸ್ಸಿನಿಯಾ ಸೋರ್ಗಿ ಎಂಬ ಶಿಲೀಂಧ್ರದಿಂದ ಬರುವ ರೋಗ. ಎಲೆಗಳ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಕಂದು ಬಣ್ಣದ ಪುಡಿಯಂತಹ ಸಣ್ಣ ಬಕ್ಕೆಗಳು ಏಳುತ್ತವೆ. ಇದು ತಂಪಾದ ವಾತಾವರಣ, ಅಧಿಕ ತೇವಾಂಶ ಮತ್ತು ಎಲೆಗಳ ಮೇಲಿರುವ ತೇವದಿಂದ ವೇಗವಾಗಿ ಹರಡುತ್ತದೆ.",
      organic: "೧. ಶೇಕಡಾ ೧-೨ ರಷ್ಟು ಬೇವಿನ ಎಣ್ಣೆ ದ್ರಾವಣ ಅಥವಾ ಅಡುಗೆ ಸೋಡಾ ಮಿಶ್ರಣವನ್ನು ಸೋಂಕಿತ ಎಲೆಗಳ ಮೇಲೆ ಸಿಂಪಡಿಸಿ.\n೨. ಸಸ್ಯದ ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿ ಹೆಚ್ಚಿಸಲು ಕಡಲಕಳೆ ಸಾರ (Seaweed extract) ಅಥವಾ ಜೀವಾಮೃತ ಬಳಸಿ.\n೩. ಕೊಯ್ಲಿನ ನಂತರ ಹೊಲದಲ್ಲಿ ಉಳಿದಿರುವ ಸೋಂಕಿತ ಕಡ್ಡಿ-ತ್ಯಾಜ್ಯಗಳನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ ಸುಟ್ಟು ಹಾಕಿ.",
      chemical: "೧. ಆರಂಭಿಕ ಹಂತದಲ್ಲಿ ಮ್ಯಾಂಕೊಜೆಬ್ (Mancozeb 75 WP) ಅನ್ನು ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ೨ ಗ್ರಾಂ ನಂತೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.\n೨. ರೋಗ ಉಲ್ಬಣಗೊಂಡರೆ ಟೆಬುಕೊನಜೋಲ್ (Tebuconazole - ೧ ಮಿಲಿ/ಲೀಟರ್) ನಂತಹ ವ್ಯವಸ್ಥಿತ ಶಿಲೀಂಧ್ರನಾಶಕ ಬಳಸಿ.",
      prevention: "೧. ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿಯುಳ್ಳ ತಳಿಗಳನ್ನು ಬಿತ್ತನೆಗೆ ಆಯ್ಕೆ ಮಾಡಿ.\n೨. ಸಾಲುಗಳ ನಡುವೆ ಸೂಕ್ತ ಗಾಳಿಯಾಡಲು ಅವಕಾಶ ನೀಡಿ, ಇದರಿಂದ ಎಲೆಗಳು ಬೇಗನೆ ಒಣಗುತ್ತವೆ.\n೩. ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ (ಉದಾ: ಸೋಯಾಬೀನ್ ಅಥವಾ ಹೆಸರುಬೇಳೆ) ಬೆಳೆ ಸರದಿ ಪದ್ಧತಿ ಅನುಸರಿಸಿ."
    }
  }
};

// Comprehensive response prompts for Krishi AI Chatbot in Demo Mode
const mockBotFarmingExpert = {
  questions: [
    {
      keywords: ["blight", "tomato", "ಚುಕ್ಕೆ", "ಟೊಮೆಟೊ", "ಖಾಯಿಲೆ"],
      en: "For Tomato Early Blight, prune bottom leaves to stop spore splashback, avoid overhead watering, and spray Copper Oxychloride (3g/L) or 1% Neem Oil. Crop rotation with non-solanaceous crops is vital.",
      kn: "ಟೊಮೆಟೊ ಎಲೆ ಮಚ್ಚೆ ರೋಗಕ್ಕೆ, ನೆಲಕ್ಕೆ ತಗಲುವ ಎಲೆಗಳನ್ನು ಕತ್ತರಿಸಿ, ಹನಿ ನೀರಾವರಿ ಬಳಸಿ ಮತ್ತು ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ (ಲೀಟರ್ ನೀರಿಗೆ ೩ ಗ್ರಾಮ್) ಅಥವಾ ಶೇಕಡಾ ೧ ರಷ್ಟು ಬೇವಿನ ಎಣ್ಣೆ ಸಿಂಪಡಿಸಿ."
    },
    {
      keywords: ["blast", "ragi", "rice", "ರಾಗಿ", "ಭತ್ತ", "ಬೆಂಕಿ"],
      en: "Blast disease is fungal. Treat seeds with Trichoderma viride. Reduce excess chemical Nitrogen (urea), use recommended Potash, and spray Tricyclazole (0.6g/L) or Pseudomonas liquid bio-agent.",
      kn: "ಬೆಂಕಿ ರೋಗವು ಶಿಲೀಂಧ್ರದಿಂದ ಬರುತ್ತದೆ. ಯೂರಿಯಾ ಗೊಬ್ಬರವನ್ನು ಅತಿಯಾಗಿ ಬಳಸಬೇಡಿ, ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ಬಳಸಿ ಮತ್ತು ಲೀಟರ್ ನೀರಿಗೆ ೦.೬ ಗ್ರಾಂ ನಂತೆ ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ ಸಿಂಪಡಿಸಿ."
    },
    {
      keywords: ["fertilizer", "manure", "npk", "ಗೊಬ್ಬರ", "ಯೂರಿಯಾ"],
      en: "Always apply balanced fertilizers based on soil tests. Combine compost/farmyard manure with NPK. For leafy growth use Nitrogen (N), for strong roots use Phosphorus (P), and for disease resistance use Potassium (K).",
      kn: "ಯಾವಾಗಲೂ ಮಣ್ಣಿನ ತಪಾಸಣೆ ಆಧಾರದ ಮೇಲೆ ಗೊಬ್ಬರ ನೀಡಿ. ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರದೊಂದಿಗೆ ಸಮತೋಲಿತ NPK ಗೊಬ್ಬರ ಬಳಸಿ. ಸಾರಜನಕವು ಬೆಳವಣಿಗೆಗೆ, ರಂಜಕವು ಬೇರುಗಳಿಗೆ ಮತ್ತು ಪೊಟ್ಯಾಶಿಯಂ ರೋಗ ನಿರೋಧಕ ಶಕ್ತಿಗೆ ಸಹಕಾರಿ."
    },
    {
      keywords: ["mandi", "price", "market", "ಮಂಡಿ", "ಬೆಲೆ", "ದರ"],
      en: "You can check daily market rates directly in the 'Mandi Prices' panel. Select your crop to view the 7-day average trend graph and list your harvest in the 'Marketplace' to get fair buying offers.",
      kn: "ನಮ್ಮ ಆಪ್‌ನಲ್ಲಿರುವ 'ಮಂಡಿ ಬೆಲೆಗಳು' ವಿಭಾಗದಲ್ಲಿ ದಿನದ ಲೈವ್ ದರಗಳನ್ನು ನೋಡಬಹುದು. ಬೆಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ ನೇರವಾಗಿ ದಲ್ಲಾಳಿಗಳಿಲ್ಲದೆ 'ರೈತ ಮಾರುಕಟ್ಟೆ'ಯಲ್ಲಿ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಒಳ್ಳೆಯ ಬೆಲೆಗೆ ಮಾರಾಟ ಮಾಡಿ."
    },
    {
      keywords: ["weather", "rain", "ಮಳೆ", "ಹವಾಮಾನ", "ಬಿತ್ತನೆ"],
      en: "Farming depends heavily on weather. Sowing should ideally begin after the first good monsoon showers. Check our 'Weather & Calendar' panel for real-time rain probability and local sowing guides.",
      kn: "ಕೃಷಿಯು ಹವಾಮಾನದ ಮೇಲೆ ನಿರ್ಧಾರಿತವಾಗಿದೆ. ಮುಂಗಾರು ಮಳೆಯ ಮೊದಲ ಮಳೆಯ ನಂತರ ಬಿತ್ತನೆ ಆರಂಭಿಸಿ. ವಿವರವಾದ ಹವಾಮಾನ ಮತ್ತು ಕೃಷಿ ಕ್ಯಾಲೆಂಡರ್ ಮಾಹಿತಿಗಾಗಿ ನಮ್ಮ 'ಹವಾಮಾನ ಸಲಹೆ' ವಿಭಾಗವನ್ನು ನೋಡಿ."
    },
    {
      keywords: ["how to use", "website", "app", "navigate", "panel", "page", "ವೆಬ್‌ಸೈಟ್", "ಆಪ್", "ಬಳಸುವುದು"],
      en: "To navigate: 1. Use the header tabs to visit sections (Home, Disease Analyser, Mandi Prices, Marketplace, Weather, Soil Advisor, Govt Schemes, 3D Digital Twin). 2. Click the Floating Mic for hands-free voice commands. 3. Adjust themes and languages in the Settings panel.",
      kn: "ನಮ್ಮ ವೆಬ್‌ಸೈಟ್ ಬಳಸಲು: ೧. ಮುಖ್ಯ ಮೆನುವಿನಲ್ಲಿರುವ ವಿಭಾಗಗಳನ್ನು ಬಳಸಿ (ರೋಗ ವಿಶ್ಲೇಷಣೆ, ಮಂಡಿ ಬೆಲೆಗಳು, ರೈತ ಮಾರುಕಟ್ಟೆ, ಮಣ್ಣಿನ ಆರೋಗ್ಯ, ಡಿಜಿಟಲ್ ಟ್ವಿನ್). ೨. ಧ್ವನಿ ಆಜ್ಞೆಗಳಿಗಾಗಿ ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ. ೩. ಭಾಷೆ ಮತ್ತು ಥೀಮ್ ಬಣ್ಣಗಳನ್ನು ಬದಲಾಯಿಸಲು ಸೆಟ್ಟಿಂಗ್ಸ್ ಬಳಸಿ."
    },
    {
      keywords: ["disease analyser", "leaf scan", "photo", "camera", "ಕ್ಯಾಮೆರಾ", "ರೋಗ", "ವಿಶ್ಲೇಷಣೆ"],
      en: "In 'Disease Analyser', you can drop leaf photos or click 'Start Camera' to fetch a live photo. Press 'Start AI Scan' to diagnose tomato early blight, rice blast, onion blotch, and get customized chemical and organic remedies.",
      kn: "'ಸಸ್ಯ ರೋಗ ವಿಶ್ಲೇಷಣೆ' ವಿಭಾಗದಲ್ಲಿ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಲೈವ್ ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ. ನಂತರ 'ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ' ಒತ್ತಿದರೆ ರೋಗಕ್ಕೆ ಕಾರಣಗಳು, ಸಾವಯವ ಮತ್ತು ರಾಸಾಯನಿಕ ಪರಿಹಾರಗಳು ಸಿಗುತ್ತವೆ."
    },
    {
      keywords: ["digital twin", "3d", "canal", "hover", "sync", "ಹೂವರ್", "ಡಿಜಿಟಲ್", "೩ಡಿ"],
      en: "The 'Digital Twin' displays a live 3D visual farmland. Configure land size, experience, water source, and machinery, then click 'Sync Data & Update AI Twin'. Hover over crop beds for expected yields and profits; hover over blue canals for flow rate, efficiency, and daily usage metrics.",
      kn: "'ಡಿಜಿಟಲ್ ಟ್ವಿನ್' ಜಮೀನಿನ ೩D ಮಾದರಿಯಾಗಿದೆ. ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ 'ಸಿಂಕ್ ಮಾಡಿ'. ಬೆಳೆ ವಿವರಗಳಿಗಾಗಿ ಹೊಲದ ಮೇಲೆ ಹೂವರ್ ಮಾಡಿ, ಹಾಗೂ ಕಾಲುವೆಯ ದಕ್ಷತೆ ಮತ್ತು ನೀರಿನ ಹರಿವನ್ನು ತಿಳಿಯಲು ನೀಲಿ ಕಾಲುವೆಗಳ ಮೇಲೆ ಹೂವರ್ ಮಾಡಿ."
    }
  ],
  fallback: {
    en: "I am Krishi AI, your crop, disease, and Krishi-Sanjeevini website specialist. Ask me agricultural questions or how to navigate our active panels, Mandi chart, 3D Digital Twin, and Soil Card diagnostic systems.",
    kn: "ನಾನು ಕೃಷಿ AI, ನಿಮ್ಮ ಬೆಳೆ, ರೋಗ ಮತ್ತು ಕೃಷಿ-ಸಂಜೀವಿನಿ ವೆಬ್‌ಸೈಟ್‌ನ ಸಹಾಯಕ. ಕೃಷಿ ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ನಮ್ಮ ಆಪ್‌ನ ೩D ಡಿಜಿಟಲ್ ಟ್ವಿನ್, ಮಣ್ಣಿನ ಸಲಹೆ ಮತ್ತು ಮಂಡಿ ಚಾರ್ಟ್ ಬಳಸುವ ಬಗ್ಗೆ ಕೇಳಿ."
  }
};

/**
 * Encodes a local File object to a Base64 string suitable for the Gemini API
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Strip out metadata prefix (e.g. "data:image/jpeg;base64,")
      const base64Str = reader.result.split(",")[1];
      resolve(base64Str);
    };
    reader.onerror = error => reject(error);
  });
}

/**
 * Analyzes crop disease using either live Gemini API or high-fidelity smart fallback engine.
 * @param {string} base64Image - Base64 encoded image string (optional if using mock)
 * @param {string} mimeType - Image MIME type (e.g., "image/jpeg")
 * @param {string} lang - Selected language ("en" or "kn")
 * @param {string} apiKey - Optional Gemini API Key
 * @param {string} fileName - Optional filename to guide the mock selector
 * @param {string} selectedCrop - The crop selected by the user ("auto", "tomato", "rice", "ragi", "onion", "corn")
 * @param {object} weatherContext - Optional object containing live weather data { main, temp, desc }
 */
export async function analyseCropDisease(base64Image, mimeType, lang = "en", apiKey = "", fileName = "", selectedCrop = "auto", weatherContext = null) {
  let lastError = null;
  // If API Key is present, try invoking the real client-side Gemini 2.5 Flash API
  if (apiKey && apiKey.trim() !== "") {
    try {
      const response = await callGeminiAPI(base64Image, mimeType, lang, apiKey, selectedCrop, weatherContext);
      return response;
    } catch (error) {
      console.warn("Live Gemini API call failed. Falling back to Smart Mock Engine...", error);
      lastError = error.message;
    }
  }

  // Smart Mock Engine Fallback
  await new Promise(resolve => setTimeout(resolve, 3500)); // Simulate AI computation delay
  
  let targetCrop = selectedCrop;
  if (!targetCrop || targetCrop === "auto") {
    const lowerName = fileName.toLowerCase();
    if (lowerName.includes("tomato") || lowerName.includes("blight") || lowerName.includes("early")) {
      targetCrop = "tomato";
    } else if (lowerName.includes("rice") || lowerName.includes("paddy") || lowerName.includes("blast")) {
      targetCrop = "rice";
    } else if (lowerName.includes("ragi") || lowerName.includes("millet") || lowerName.includes("finger")) {
      targetCrop = "ragi";
    } else if (lowerName.includes("onion") || lowerName.includes("blotch") || lowerName.includes("bulb")) {
      targetCrop = "onion";
    } else if (lowerName.includes("corn") || lowerName.includes("maize") || lowerName.includes("rust") || lowerName.includes("ಜೋಳ")) {
      targetCrop = "corn";
    } else {
      // Default to corn instead of random to prevent user confusion with demo images
      targetCrop = "corn";
    }
  }

  const result = mockDiagnostics[targetCrop][lang];
  
  let finalOrganic = result.organic;
  let finalChemical = result.chemical;

  // Inject Weather-Aware Smart Alerts for Mock Engine
  if (weatherContext) {
    if (weatherContext.main.includes('rain') || weatherContext.main.includes('drizzle') || weatherContext.main.includes('thunderstorm')) {
      const warningEn = "WEATHER ALERT: It is currently raining. Do NOT apply any chemical or organic foliar sprays right now as they will wash away. Ensure field drainage immediately to prevent root rot, and wait for clear skies to apply treatments.";
      const warningKn = "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ: ಪ್ರಸ್ತುತ ಮಳೆಯಾಗುತ್ತಿದೆ. ಯಾವುದೇ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಬೇಡಿ, ಏಕೆಂದರೆ ಅದು ತೊಳೆದುಹೋಗುತ್ತದೆ. ತಕ್ಷಣ ಜಮೀನಿನಲ್ಲಿ ನೀರು ನಿಲ್ಲದಂತೆ ಬಸಿದುಹೋಗಲು ವ್ಯವಸ್ಥೆ ಮಾಡಿ. ಆಕಾಶ ತಿಳಿಯಾದ ಮೇಲೆ ಔಷಧ ಸಿಂಪಡಿಸಿ.";
      finalChemical = `[🚨 ${lang === 'kn' ? warningKn : warningEn}]\n\n${finalChemical}`;
      finalOrganic = `[🚨 ${lang === 'kn' ? warningKn : warningEn}]\n\n${finalOrganic}`;
    } else if (weatherContext.temp > 35) {
      const heatEn = "WEATHER ALERT: Extreme heat detected. Avoid spraying chemicals during peak sunlight to prevent leaf burn. Apply treatments only in the late evening or early morning.";
      const heatKn = "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ: ವಿಪರೀತ ಬಿಸಿಲು ಇದೆ. ಮಧ್ಯಾಹ್ನ ಯಾವುದೇ ಔಷಧ ಸಿಂಪಡಿಸಬೇಡಿ, ಇದರಿಂದ ಎಲೆಗಳು ಸುಟ್ಟುಹೋಗಬಹುದು. ಸಂಜೆ ಅಥವಾ ಮುಂಜಾನೆ ಮಾತ್ರ ಸಿಂಪಡಿಸಿ.";
      finalChemical = `[☀️ ${lang === 'kn' ? heatKn : heatEn}]\n\n${finalChemical}`;
    }
  }

  return {
    crop: result.crop,
    disease: result.disease,
    severity: result.severity,
    causes: result.causes,
    organic: finalOrganic,
    chemical: finalChemical,
    prevention: result.prevention,
    isMock: true,
    error: lastError
  };
}

/**
 * Communicates directly with the client-side Gemini 3.5 Flash model
 */
async function callGeminiAPI(base64Image, mimeType, lang = "en", apiKey, selectedCrop = "auto", weatherContext = null) {
  const modelName = "gemini-3.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  let cropHint = "";
  if (selectedCrop && selectedCrop !== "auto") {
    cropHint = `The farmer explicitly identified this crop as: "${selectedCrop}". You MUST prioritize and base your diagnostic analysis on this crop variety (e.g. if Tomato is selected, analyze it as a Tomato leaf disease; if Corn is selected, analyze it as Corn leaf disease).`;
  }

  let weatherHint = "";
  if (weatherContext) {
    weatherHint = `
    CRITICAL WEATHER CONTEXT:
    The user's current live weather is: ${weatherContext.desc} with a temperature of ${Math.round(weatherContext.temp)}°C. 
    You MUST tailor the 'organic' and 'chemical' treatment steps to account for this specific live weather. For example, if it's raining or about to rain, explicitly warn them NOT to spray chemicals as they will wash off, and suggest alternative immediate actions to save the crop. If it's a heatwave, suggest heat-specific precautions. Put this weather-aware advisory prominently at the start of the treatment sections.
    `;
  }

  const promptText = `
    You are an expert crop pathologist and agricultural advisor. Analyze this crop leaf/plant image.
    ${cropHint}
    ${weatherHint}
    Provide the analysis results in a structured JSON format. 
    You MUST output ONLY a valid JSON object. Do NOT wrap it in markdown or backticks.
    The response values (diagnostics, descriptions, treatments, causes, preventions) MUST be written in the language specified: "${lang === "kn" ? "Kannada" : "English"}".
    
    CRITICAL: The JSON keys ("crop", "disease", "severity", "causes", "organic", "chemical", "prevention") MUST remain in English exactly as specified below, even if the values are written in Kannada. Do NOT translate the key names.

    The JSON structure MUST contain the following keys exactly:
    {
      "crop": "Brief name of the crop",
      "disease": "Detected disease name (scientific and common)",
      "severity": "Severity level (choose one of: Low, Medium, High, Critical)",
      "causes": "Explanation of root cause and environmental factors/symptoms",
      "organic": "Step-by-step organic, chemical-free treatment steps",
      "chemical": "Step-by-step chemical control methods (use specific safe crop fungicides/pesticides with exact dosages)",
      "prevention": "Practical preventative steps for next cropping cycle"
    }
    
    Keep explanations highly practical, farmer-friendly, and localized. If the language is Kannada, use clean, readable Kannada script.
  `;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: promptText },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image
            }
          }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!rawText) {
    throw new Error("Empty response received from Gemini API");
  }

  // Clean rawText of any potential markdown wrapper blocks
  let cleanText = rawText.trim();
  if (cleanText.startsWith("```")) {
    cleanText = cleanText.replace(/^```json/, "").replace(/```$/, "").trim();
  }

  const parsedResult = JSON.parse(cleanText);
  
  const forceString = (val) => {
    if (val === null || val === undefined) return "N/A";
    if (Array.isArray(val)) return val.join("\n");
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  };

  const getProp = (obj, key) => {
    if (!obj) return undefined;
    const lowerKey = key.toLowerCase();
    for (const k in obj) {
      if (k.toLowerCase() === lowerKey) {
        return obj[k];
      }
    }
    return undefined;
  };

  return {
    crop: forceString(getProp(parsedResult, "crop") || "Unknown"),
    disease: forceString(getProp(parsedResult, "disease") || "Healthy / Undetermined"),
    severity: forceString(getProp(parsedResult, "severity") || "Low"),
    causes: forceString(getProp(parsedResult, "causes") || "N/A"),
    organic: forceString(getProp(parsedResult, "organic") || "N/A"),
    chemical: forceString(getProp(parsedResult, "chemical") || "N/A"),
    prevention: forceString(getProp(parsedResult, "prevention") || "N/A"),
    isMock: false
  };
}

/**
 * Handle farming chatbot queries, restricted strictly to agricultural and website topics
 */
export async function getChatbotResponse(query, lang = "en", apiKey = "") {
  const queryLower = query.toLowerCase().trim();
  
  // Guardrail check: Is it agricultural or website related?
  const agriculturalKeywords = [
    "crop", "disease", "plant", "pest", "fertilizer", "soil", "mandi", "price", "ragi", "rice", "tomato", "onion", "arecanut", "coffee",
    "coconut", "jowar", "water", "irrigation", "organic", "neem", "chemical", "fungicide", "weather", "rain", "seed", "sow", "harvest",
    "yield", "subsidy", "scheme", "farming", "farm", "kisan", "paddy", "blight", "blast", "blotch", "npk", "ph", "nitrogen", "potash",
    "ರಾಗಿ", "ಭತ್ತ", "ಅಕ್ಕಿ", "ಟೊಮೆಟೊ", "ಈರುಳ್ಳಿ", "ಅಡಿಕೆ", "ತೆಂಗಿನಕಾಯಿ", "ಕಾಫಿ", "ಜೋಳ", "ಬೆಳೆ", "ರೋಗ", "ಕೀಟ", "ಗೊಬ್ಬರ", "ಮಣ್ಣು", "ಮಂಡಿ",
    "ಬೆಲೆ", "ಹವಾಮಾನ", "ಮಳೆ", "ನೀರಾವರಿ", "ಸಾವಯವ", "ಕೃಷಿ", "ಯೋಜನೆ", "ಬಿತ್ತನೆ", "ಕೊಯ್ಲು"
  ];

  const websiteKeywords = [
    "website", "app", "navigate", "panel", "page", "use", "feature", "button", "how", "bug", "issue", "click", "select", "disease analyser",
    "mandi prices", "marketplace", "weather", "soil", "digital twin", "schemes", "voice", "mic", "talk", "api key", "settings",
    "language", "english", "kannada", "theme", "dark", "light", "sync", "gps", "location", "help", "support",
    "ವೆಬ್‌ಸೈಟ್", "ಆಪ್", "ಪುಟ", "ನೆರವು", "ನೆರವಿಗಾಗಿ", "ರೋಗ ವಿಶ್ಲೇಷಣೆ", "ಮಂಡಿ ಬೆಲೆಗಳು", "ರೈತ ಮಾರುಕಟ್ಟೆ", "ಹವಾಮಾನ", "ಮಣ್ಣಿನ ಆರೋಗ್ಯ", "ಡಿಜಿಟಲ್ ಟ್ವಿನ್",
    "ಯೋಜನೆಗಳು", "ಧ್ವನಿ", "ಭಾಷೆ", "ಕನ್ನಡ", "ಇಂಗ್ಲಿಷ್", "ಸಲಹೆ", "ಪರೀಕ್ಷೆ", "ಸಿಂಕ್", "ಜಿಪಿಎಸ್"
  ];
  
  const isAllowed = agriculturalKeywords.some(keyword => queryLower.includes(keyword)) || 
                    websiteKeywords.some(keyword => queryLower.includes(keyword));
  
  if (!isAllowed) {
    return {
      text: lang === "kn" 
        ? "ಕ್ಷಮಿಸಿ, ನಾನು ಕೃಷಿ, ಬೆಳೆಗಳು, ರೋಗಗಳು, ಮಂಡಿ ಬೆಲೆಗಳು ಹಾಗೂ ಈ ವೆಬ್‌ಸೈಟ್‌ನ ಸೇವೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಶ್ನೆಗಳಿಗೆ ಮಾತ್ರ ಉತ್ತರಿಸಲು ಸೀಮಿತವಾಗಿದ್ದೇನೆ. ಕೃಷಿ ಯಶಸ್ಸಿನ ಕಡೆಗೆ ಗಮನ ಹರಿಸೋಣ!"
        : "I am designed to assist with agricultural questions and issues or navigation related to our Krishi-Sanjeevini website only. Let's keep our focus on prosperous farming!",
      isGuardrail: true
    };
  }

  // If Gemini API key is available, call the Gemini API for highly customized chatbot answers
  if (apiKey && apiKey.trim() !== "") {
    try {
      const chatText = await callGeminiChatAPI(query, lang, apiKey);
      return { text: chatText, isGuardrail: false };
    } catch (e) {
      console.warn("Gemini Chat API call failed. Using Smart Mock fallback chat...", e);
    }
  }

  // Simple keyword matcher for mock chatbot
  for (const item of mockBotFarmingExpert.questions) {
    if (item.keywords.some(keyword => queryLower.includes(keyword))) {
      return {
        text: lang === "kn" ? item.kn : item.en,
        isGuardrail: false
      };
    }
  }

  // Default mock expert response
  return {
    text: mockBotFarmingExpert.fallback[lang],
    isGuardrail: false
  };
}

/**
 * API call helper for Gemini chatbot
 */
async function callGeminiChatAPI(query, lang = "en", apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
  
  const systemPrompt = `
    You are 'Krishi AI', a friendly, highly intelligent agricultural expert and website assistant. 
    Your goal is to assist farmers with detailed, practical agricultural solutions and help users navigate and solve issues on the Krishi-Sanjeevini website.
    You must answer in a very encouraging, clear, and direct style. Use bullet points where appropriate.
    The response MUST be written in the language specified: "${lang === "kn" ? "Kannada" : "English"}".
    
    IMPORTANT: You must ONLY answer questions regarding:
    - Crops, gardening, vegetables, grains, fruits, and forestry
    - Plant pathogens, diseases, mold, pests, and insects
    - Soils, NPK levels, fertilization, composting, and land prep
    - Irrigation, weather guides, sowing times, and harvesting
    - Mandi pricing, marketplace buying and selling strategies, and government agricultural schemes.
    - Krishi-Sanjeevini website features, including:
      1. Crop Disease Analyser (drag and drop leaf image or use camera stream to diagnose early blight, rice blast, onion blotch, and common corn rust)
      2. Mandi Prices (check daily APMC rates, view 7-day pricing trend charts, search crops/markets)
      3. Farmer Marketplace (list harvests, browse buyer/seller listings)
      4. Weather & Calendar (live GPS weather, Kharif/Rabi/Zaid sowing calendars)
      5. Soil Advisor (NPK N-140 P-60 K-100 targets and pH diagnostics, agricultural lime/gypsum soil amendments)
      6. Government Schemes Portal (PM-KISAN, Krishi Bhagya, PMFBY, Ganga Kalyana, Yashaswini)
      7. Digital Twin 3D Farmland (input experience, income, machinery, soil type, water source, GPS location, and crop duration; hover over cells for crop details; hover over blue canals for flow rate, efficiency, daily usage; click 'Sync Data' to animate the isometric board and update SaaS diagnostics including credit score / loan limits)
      8. Voice Commands (click Mic to speak panels navigation, language switching, etc.)
      
    If the question is completely unrelated to farming, agriculture, or the Krishi-Sanjeevini website, politely reject it by saying:
    "I am designed to assist with agricultural, crop, disease, Mandi questions, and website related queries only. Let's keep our focus on prosperous farming!" (or localized equivalent in Kannada).
  `;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: systemPrompt },
          { text: `User query: ${query}` }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error("Chatbot API response error");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "No response received.";
}
