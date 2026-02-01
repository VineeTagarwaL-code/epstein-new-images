const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "..", "data.json");
const imagesDir = path.join(__dirname, "..", "public", "images");

// Read the data.json file
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Create a manifest for the frontend
const manifest = [];

for (const item of data) {
  const oldName = `image-${item.index}.jpg`;
  const newName = `photo-${String(item.index + 1).padStart(3, "0")}.jpg`;

  const oldPath = path.join(imagesDir, oldName);
  const newPath = path.join(imagesDir, newName);

  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${oldName} -> ${newName}`);
  }

  manifest.push({
    id: item.index + 1,
    src: `/images/${newName}`,
    alt: item.alt,
  });
}

// Write manifest file for the frontend
const manifestPath = path.join(__dirname, "..", "lib", "images.json");
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nCreated manifest at: ${manifestPath}`);
console.log(`Total images: ${manifest.length}`);
