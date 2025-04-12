const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Create a blank PNG file
const createBlankPNG = (filename) => {
  const buffer = Buffer.alloc(1024 * 1024 * 4); // 1MB of white pixels
  fs.writeFileSync(path.join(assetsDir, filename), buffer);
};

createBlankPNG('icon.png');
createBlankPNG('splash.png');
createBlankPNG('adaptive-icon.png');
createBlankPNG('favicon.png');

console.log('Created blank PNG assets');
