const fs = require('fs');

try {
  const html = fs.readFileSync('index.html', 'utf8');
  const appjs = fs.readFileSync('app.js', 'utf8');
  
  // Extract all IDs from index.html
  const idRegex = /id="([^"]+)"/g;
  let match;
  const ids = new Set();
  while ((match = idRegex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  
  // Find all getElementById in app.js
  const getElementRegex = /getElementById\(['"]([^'"]+)['"]\)/g;
  let missingIds = [];
  while ((match = getElementRegex.exec(appjs)) !== null) {
    if (!ids.has(match[1])) {
      missingIds.push(match[1]);
    }
  }
  
  if (missingIds.length > 0) {
    console.log("MISSING IDs in HTML but referenced in app.js:");
    missingIds.forEach(id => console.log("- " + id));
  } else {
    console.log("All getElementById references are valid in HTML!");
  }
} catch (e) {
  console.error("Error:", e);
}
