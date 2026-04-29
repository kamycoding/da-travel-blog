const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = path.join(__dirname, "../assets/img");
const outputDir = path.join(__dirname, "../assets/img-optimized");

const supportedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

function getImages(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  return files.flatMap((file) => {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      return getImages(fullPath);
    }

    const ext = path.extname(file.name).toLowerCase();

    if (!supportedExtensions.includes(ext)) {
      return [];
    }

    return [fullPath];
  });
}

async function optimizeImage(filePath) {
  const relativePath = path.relative(inputDir, filePath);
  const parsedPath = path.parse(relativePath);

  const outputFolder = path.join(outputDir, parsedPath.dir);
  const outputPath = path.join(outputFolder, `${parsedPath.name}.webp`);

  fs.mkdirSync(outputFolder, { recursive: true });

  await sharp(filePath)
    .rotate()
    .resize({
      width: 1920,
      withoutEnlargement: true,
    })
    .webp({
      quality: 82,
      effort: 6,
    })
    .toFile(outputPath);

  const originalSize = fs.statSync(filePath).size;
  const optimizedSize = fs.statSync(outputPath).size;
  const savedPercent = Math.round((1 - optimizedSize / originalSize) * 100);

  console.log(`${relativePath} -> ${path.relative(outputDir, outputPath)} | saved ${savedPercent}%`);
}

async function run() {
  if (!fs.existsSync(inputDir)) {
    console.error("assets/img folder not found");
    return;
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const images = getImages(inputDir);

  for (const image of images) {
    await optimizeImage(image);
  }

  console.log("Done. Optimized images are in assets/img-optimized");
}

run();