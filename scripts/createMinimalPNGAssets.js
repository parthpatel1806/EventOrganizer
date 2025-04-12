const fs = require('fs');
const path = require('path');

// Minimal 1x1 transparent PNG (89 bytes)
const minimalPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');

const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create minimal valid PNG files
fs.writeFileSync(path.join(assetsDir, 'icon.png'), minimalPNG);
fs.writeFileSync(path.join(assetsDir, 'splash.png'), minimalPNG);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), minimalPNG);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), minimalPNG);

console.log('Created minimal valid PNG assets');
