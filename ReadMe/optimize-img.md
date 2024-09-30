
# Image optimizer

The Image Optimizer script included in this project is designed to automatically convert your images into the WebP
format and resize them for optimal loading speeds across devices. This process helps to significantly improve the performance of your website by reducing image file sizes without sacrificing quality.

The optimizer generates multiple versions of each image (e.g., 300px, 600px, 1200px widths) to ensure that the correct image size is served based on the user's device screen size.

## Key Features

1. Automatic WebP Conversion: Converts all images in the `assets/img` folder from jpg and png formats to the WebP format for better performance.
2. Multiple Image Resolutions: Creates 3 different resolutions (300px, 600px, 1200px) for each image to optimize loading across devices.
3. Easy Setup: Requires a single command to run the optimizer and update images.

## How to Use the Image Optimizer

1. Adding New Images:

* Place your new images in the `src/assets/img/ folder`.
* Images should be in either `.jpg` or `.png` format for conversion.

2 Running the Optimizer:

* Open a terminal in the root of the project folder.
* Run the following command to execute the image optimizer script: ==> `node image-optimizer.mjs`

* The script will automatically:
* Convert your images to the WebP format.
* Resize images to 300px, 600px, and 1200px widths.
* Save the optimized images in the `src/assets/img/webp/` directory.

## Using the Optimized Images

* After running the optimizer, you’ll find the optimized images in the `src/assets/img/webp/` folder.
* Update your references in the `src/data.ts` file or where applicable to use the new WebP files for optimal performance.
Example Image Paths:

If you add image1.jpg in the `src/assets/img/` folder, after running the optimizer, the following images will be generated:

* image1-300w.webp (300px width)
* image1-600w.webp (600px width)
* image1-1200w.webp (1200px width)

## Notes

** Ensure you run the image optimizer script every time you add or modify images.
Use WebP images to improve loading speed, especially on mobile devices.
For best results, ensure that your original images are of high quality, so the resized versions maintain good clarity.
Troubleshooting
If you encounter any issues when running the optimizer:

## Conclusion

Using the image optimizer ensures that your product page runs faster and more efficiently across different devices by leveraging WebP and responsive images. This tool is an integral part of optimizing user experience and ensuring high performance.

## Troubleshooting

If you encounter any issues when running the optimizer:

Missing Node.js: Ensure you have Node.js installed on your system. You can download it here.
Permission Issues: Run your terminal as an administrator if you face permission-related errors.
No Changes Detected: Ensure you place new images in the `src/assets/img/` folder and that they are in .jpg or .png format.

## Missing Node.js

Ensure you have Node.js installed on your system. You can download it here.
Permission Issues: Run your terminal as an administrator if you face permission-related errors.
No Changes Detected: Ensure you place new images in the `src/assets/img/` folder and that they are in .jpg or .png format.
Conclusion
Using the image optimizer ensures that your product page runs faster and more efficiently across different devices by leveraging WebP and responsive images. This tool is an integral part of optimizing user experience and ensuring high performance.
