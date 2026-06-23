import fs from 'fs';

const html = fs.readFileSync('C:/Users/ap247/Documents/00_Portfolio/Portfolio.html', 'utf-8');

// The HTML contains window.__IMG = { profile: "data:image/...", ... };
const imgMatch = html.match(/window\.__IMG\s*=\s*(\{[\s\S]*?\});/);

if (imgMatch) {
  let imgStr = imgMatch[1];
  // Convert it into a valid JSON object by putting quotes around keys
  imgStr = imgStr.replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":');
  // It also contains trailing commas.
  imgStr = imgStr.replace(/,\s*}/g, '}');
  
  try {
    const parsedImg = JSON.parse(imgStr);
    
    // Create public/assets dir if it doesn't exist
    if (!fs.existsSync('./public/assets')) {
      fs.mkdirSync('./public/assets', { recursive: true });
    }

    for (const [key, dataUrl] of Object.entries(parsedImg)) {
      if (dataUrl.startsWith('data:image/')) {
        const matches = dataUrl.match(/^data:image\/([a-zA-Z+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
          const base64Data = matches[2];
          fs.writeFileSync(`./public/assets/${key}.${ext}`, base64Data, 'base64');
          console.log(`Saved ${key}.${ext}`);
        }
      }
    }
  } catch (e) {
    console.error("Error parsing __IMG:", e);
  }
} else {
  console.log("No __IMG found.");
}
