import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import sharp from 'sharp';
import path from 'path';

const resizeImage = async (inputPath, outputPath, width) => {
  await sharp(inputPath)
    .resize({ width })
    .toFile(outputPath);
};

// Optimize images and generate multiple sizes
(async () => {
  const files = await imagemin(['assets/img/*.{jpg,png}'], {
    destination: 'assets/img',
    plugins: [
      imageminWebp({ quality: 60 })
    ]
  });

  console.log('Images optimized and converted to WebP!');

  files.forEach(async (file) => {
    const filePath = file.destinationPath.replace(/\.webp$/, '');
    const { name } = path.parse(filePath);

    // Generate different sizes (300px, 600px, and 1200px widths)
    await resizeImage(file.destinationPath, `assets/img/${name}-300w.webp`, 300);
    await resizeImage(file.destinationPath, `assets/img/${name}-600w.webp`, 600);
    await resizeImage(file.destinationPath, `assets/img/${name}-1200w.webp`, 1200);
  });
})();
