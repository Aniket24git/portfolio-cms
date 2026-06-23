const fs = require('fs');

const html = fs.readFileSync('C:/Users/ap247/Documents/00_Portfolio/Portfolio.html', 'utf-8');

// The HTML contains window.PORTFOLIO = { ... };
// We need to extract the object.
const portfolioMatch = html.match(/window\.PORTFOLIO\s*=\s*(\{[\s\S]*?\});\s*const/);
const imgMatch = html.match(/window\.__IMG\s*=\s*(\{[\s\S]*?\});/);

let portfolioStr = portfolioMatch ? portfolioMatch[1] : null;
let imgStr = imgMatch ? imgMatch[1] : null;

// Since the object strings are not strictly valid JSON (they have trailing commas and unquoted keys),
// we can evaluate them in a secure-ish context to get the JSON representation.
let parsedPortfolio = null;
let parsedImg = null;

if (portfolioStr) {
  try {
    // using eval is generally unsafe, but we are running this locally on a known file we generated
    eval('parsedPortfolio = ' + portfolioStr);
  } catch (e) {
    console.error("Error parsing PORTFOLIO:", e);
  }
}

if (imgStr) {
  try {
    eval('parsedImg = ' + imgStr);
  } catch (e) {
    console.error("Error parsing __IMG:", e);
  }
}

const outData = {
  PORTFOLIO: parsedPortfolio,
  __IMG: parsedImg
};

fs.writeFileSync('C:/Users/ap247/Documents/00_Portfolio/portfolio/src/content/rawHtmlData.json', JSON.stringify(outData, null, 2));
console.log("Extraction successful.");
