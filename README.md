# Krishi-Sanjeevini (ಕೃಷಿ ಸಂಜೀವಿನಿ) 🌾

An intelligent, accessible dual-language web application designed specifically for farmers in Karnataka. Powered by Google's Gemini AI, this application provides an interactive, voice-controlled, farmer-friendly dashboard to manage crops, detect diseases, monitor market prices, and improve farming outcomes.

## 🚀 Features

- **🗣️ Voice Assistant (Kannada & English):** Fully hands-free operation using native speech recognition. Speak to the app in Kannada or English to navigate, check prices, or ask the Gemini AI agricultural questions directly.
- **🍃 AI Crop Disease Analyser:** Upload a photo of a diseased leaf to instantly get organic and chemical treatment recommendations tailored to your specific crop.
- **📈 Live Mandi Prices:** Monitor live crop prices across various APMC markets in Karnataka with 7-day average trend graphs.
- **🛒 Direct Marketplace:** A direct farmer-to-buyer platform eliminating middlemen for fair trading.
- **⛅ Weather & Sowing Advisory:** Get real-time weather probabilities and regional sowing calendar guides.
- **🧪 Soil NPK Health Advisor:** Input soil conditions (Nitrogen, Phosphorus, Potassium, pH) to receive customized biological fertilizer guides.
- **🏛️ Government Schemes Explorer:** Easily browse local subsidies (e.g., PM-KISAN, Krishi Bhagya) and access application routes.
- **📱 Fully Responsive Design:** Works flawlessly on both mobile phones and laptops/desktop computers.
- **🌗 Dark/Light Mode:** Toggle between an earthy light mode or a battery-saving dark mode.

## 🛠️ Technology Stack

- **Frontend:** Pure HTML5, CSS3, Vanilla JavaScript (No heavy frameworks required)
- **AI Integration:** Google Gemini 2.5 Flash API (Client-side inference)
- **Voice Engine:** Web Speech API (SpeechSynthesis & SpeechRecognition)
- **Hosting:** Vercel (Ready for static deployment)

## 💻 Local Setup Instructions

Since this is a fully static client-side application, running it locally is incredibly simple.

### Prerequisites
You only need a modern web browser (Google Chrome or Microsoft Edge recommended for optimal Voice Recognition support).

### Steps
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/krishi-sanjeevini.git
   ```
2. Navigate into the project folder:
   ```bash
   cd krishi-sanjeevini
   ```
3. Start a local development server. If you have Node.js installed, you can run:
   ```bash
   npx serve .
   ```
   Or using Python:
   ```bash
   python -m http.server 3000
   ```
4. Open your browser and navigate to `http://localhost:3000`

## 🌐 Deployment to Vercel

This app is perfectly structured to be deployed on Vercel with zero configuration.
1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Run the deployment command from the project root directory:
   ```bash
   vercel --prod
   ```
3. Follow the quick prompts, and your app will be live globally!

## 🔐 Configuration (API Keys)

By default, the application runs using an embedded Gemini API key for demo purposes. 
To use your own API Key:
1. Open `app.js`
2. Locate the `state` object at the top of the file.
3. Replace the `apiKey` value with your own Google Gemini API key.

## 🤝 Contribution

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## 📜 License

This project is open-source and available under the MIT License.
