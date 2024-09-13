import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import { join } from 'path';

(async () => {
    const inputPath = join(process.cwd(), 'src/assets/img/*.{png,jpg}');
    const outputPath = join(process.cwd(), 'src/assets/img/webp');

    await imagemin([inputPath], {
        destination: outputPath,
        plugins: [
            imageminWebp({ quality: 80 })
        ]
    });

    console.log('Images optimized and converted to WebP!');
})();
