const fs = require("fs");
const path = require("path");
const https = require("https");

const dataPath = path.join(__dirname, "..", "data.json");
const publicDir = path.join(__dirname, "..", "public", "images");

// Ensure the output directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read the data.json file
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https
      .get(url, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          // Handle redirects
          downloadImage(response.headers.location, filepath)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
  });
}

async function main() {
  console.log(`Found ${data.length} images to download`);

  for (const item of data) {
    const url = item.src;
    const ext = ".jpg"; // All URLs appear to be JPGs
    const filename = `image-${item.index}${ext}`;
    const filepath = path.join(publicDir, filename);

    try {
      console.log(`Downloading ${item.index + 1}/${data.length}: ${filename}`);
      await downloadImage(url, filepath);
      console.log(`  ✓ Saved to ${filepath}`);
    } catch (error) {
      console.error(`  ✗ Failed to download image ${item.index}: ${error.message}`);
    }
  }

  console.log("\nDone!");
}

main();
