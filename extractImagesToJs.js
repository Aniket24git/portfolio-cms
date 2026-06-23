import fs from 'fs';

const html = fs.readFileSync('C:/Users/ap247/Documents/00_Portfolio/Portfolio.html', 'utf-8');

const match = html.match(/window\.__IMG\s*=\s*(\{[\s\S]*?\});/);

if (match) {
  const imgStr = match[1];
  const jsContent = `export const IMAGES = ${imgStr};\n`;
  fs.writeFileSync('./src/content/images.js', jsContent);
  console.log('Successfully wrote src/content/images.js');
} else {
  console.log('__IMG not found');
}
