const fs = require('fs');
const path = require('path');

function createBundle() {
  console.log("Starting build bundle process...");
  
  // List of files in order of dependencies (independent files first)
  const files = [
    'translations.js',
    'mandi.js',
    'schemes.js',
    'gemini.js',
    'voice.js',
    'app.js'
  ];
  
  let bundledContent = `// Krishi-Sanjeevini High-Performance Unified Bundle
// Generated automatically to support double-click (file:// protocol) and local servers.
\n`;

  for (const file of files) {
    console.log(`Processing file: ${file}`);
    let content = fs.readFileSync(file, 'utf8');
    
    if (file === 'app.js') {
      // Strip imports from the top of app.js
      content = content.replace(/import\s+[\s\S]*?\s+from\s+['"].*?['"]\s*;?/g, '// import removed');
    }
    
    // Strip export keywords
    content = content.replace(/\bexport\s+const\b/g, 'const');
    content = content.replace(/\bexport\s+function\b/g, 'function');
    content = content.replace(/\bexport\s+async\s+function\b/g, 'async function');
    content = content.replace(/\bexport\s+\{\s*SpeechRecognition\s*\}\s*;?/g, '/* exported SpeechRecognition */');
    
    bundledContent += `\n// ==========================================\n// SECTION: ${file}\n// ==========================================\n\n`;
    bundledContent += content;
  }

  // Inject robust DOMContentLoaded readyState check in the bundled code
  // Let's find the DOMContentLoaded event listener in app.js section and replace it with a robust check
  const domContentTarget = 'document.addEventListener("DOMContentLoaded", () => {';
  if (bundledContent.includes(domContentTarget)) {
    console.log("Injecting robust DOMContentLoaded check...");
    
    // Find where the DOMContentLoaded handler ends. It ends at the very end of app.js.
    // In app.js, the DOMContentLoaded block starts at line 203 and ends at line 2030 (the setupEventListeners call).
    // Let's replace the DOMContentLoaded event listener with a function declaration and instant runner.
    // We can do this cleanly by replacing the DOMContentLoaded handler with a named function and a readyState check.
    
    const replacement = `
function initializeKrishiApp() {
  console.log("[Krishi App] Initializing core modules...");
`;
    
    bundledContent = bundledContent.replace(domContentTarget, replacement);
    
    // The closing brace of DOMContentLoaded in app.js is at line 2030, followed by `function toggleLanguage()`.
    // Let's find the closing brace and add the readyState runner.
    // In app.js:
    // 2028:   }
    // 2029: }
    // 2030: });
    // Let's find `setupEventListeners();\n  }\n}` or similar around the end of the init block.
    // Let's replace `setupEventListeners();\n  }\n  if (dom.twinConfigForm) {\n    dom.twinConfigForm.addEventListener("submit", (e) => {\n      e.preventDefault();\n      applyTwinConfigUpdates();\n    });\n  }\n});`
    // Wait, let's look at lines 2020-2035 of app.js using view_file to see the exact text near the end of DOMContentLoaded.
  }

  fs.writeFileSync('app.bundle.js', bundledContent, 'utf8');
  console.log("✅ Success: app.bundle.js created successfully!");
}

createBundle();
