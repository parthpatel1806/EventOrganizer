const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir);
}

// Create minimal PNG placeholders
const createPlaceholder = (filename, width, height) => {
  const buffer = Buffer.alloc(width * height * 4);
  fs.writeFileSync(path.join(assetsDir, filename), buffer);
};

createPlaceholder('icon.png', 1024, 1024);
createPlaceholder('splash.png', 1242, 2436); 
createPlaceholder('adaptive-icon.png', 1024, 1024);
createPlaceholder('favicon.png', 64, 64);

console.log('Created placeholder assets');
