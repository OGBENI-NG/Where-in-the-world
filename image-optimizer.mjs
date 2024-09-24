import imagemin from 'imagemin'; 
import imageminWebp from 'imagemin-webp'; 
import sharp from 'sharp'; 
import path from 'path'; 

// Function to resize an image to a specific width and save it to the specified output path
const resizeImage = async (inputPath, outputPath, width) => {
  await sharp(inputPath) // Load the input image using Sharp
    .resize({ width }) // Resize the image to the specified width
    .toFile(outputPath); // Save the resized image to the output path
};

// Optimize images and generate multiple sizes
(async () => {
  // Optimize images and convert them to WebP format
  const files = await imagemin(['assets/img/*.{jpg,png}'], {
    destination: 'assets/img', // Destination for optimized images
    plugins: [
      imageminWebp({ quality: 80 }) // Convert images to WebP with 80% quality
    ]
  });

  // Loop through each optimized image file
  files.forEach(async (file) => {
    // Remove the .webp extension from the destination path
    const filePath = file.destinationPath.replace(/\.webp$/, '');
    const { name } = path.parse(filePath); // Extract the file name without extension

    // Generate resized images in different widths (300px, 600px, and 1200px)
    await resizeImage(file.destinationPath, `assets/img/${name}-300w.webp`, 300);
    await resizeImage(file.destinationPath, `assets/img/${name}-600w.webp`, 600); 
    await resizeImage(file.destinationPath, `assets/img/${name}-1200w.webp`, 1200);
  });
})();
