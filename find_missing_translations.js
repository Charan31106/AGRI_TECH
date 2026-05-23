import fs from 'fs';
import path from 'path';
import { translations } from './translations.js';

const htmlPath = './index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Match all id="..." in index.html
const idRegex = /id="([^"]+)"/g;
let match;
const ids = [];

while ((match = idRegex.exec(htmlContent)) !== null) {
  ids.push(match[1]);
}

console.log(`Found ${ids.length} total IDs in index.html`);

const prefixes = ["txt-", "lbl-", "btn-", "stat-", "opt-", "th-", "card-"];
const matchedIds = ids.filter(id => prefixes.some(p => id.startsWith(p)));

console.log(`Found ${matchedIds.length} translation-related IDs:`);

const dictEn = translations.en;
const dictKn = translations.kn;

const missing = [];

matchedIds.forEach(id => {
  let key = null;
  if (id.startsWith("txt-")) key = id.substring(4);
  else if (id.startsWith("lbl-")) key = id.substring(4);
  else if (id.startsWith("btn-")) key = id.substring(4);
  else if (id.startsWith("stat-")) key = id.substring(5);
  else if (id.startsWith("opt-")) key = id.substring(4);
  else if (id.startsWith("th-")) key = id.substring(3);
  else if (id.startsWith("card-")) {
    const parts = id.split("-");
    if (parts.length >= 3) {
      const camel = parts[1] + parts[2].charAt(0).toUpperCase() + parts[2].slice(1);
      key = camel;
    } else {
      key = id.substring(5);
    }
  }

  // Also try converting kebab-case to camelCase
  let camelKey = key;
  if (key && key.includes("-")) {
    const parts = key.split("-");
    camelKey = parts[0] + parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  }

  const hasEn = dictEn[key] !== undefined || dictEn[camelKey] !== undefined;
  const hasKn = dictKn[key] !== undefined || dictKn[camelKey] !== undefined;

  if (!hasEn || !hasKn) {
    missing.push({ id, resolvedKey: key, camelKey, hasEn, hasKn });
  }
});

console.log("\n--- MISSING OR MISMATCHED TRANSLATIONS ---");
console.log(JSON.stringify(missing, null, 2));
