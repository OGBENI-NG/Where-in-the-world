# Thirteen store

## Product Overview

Welcome to Thirteen Store! This is a premium product page template built with modern technologies like
HTML5, CSS, Tailwind CSS, TypeScript, and React. This documentation will guide you through the installation,
setup, and customization processes.

## Table of Contents

1. Introduction
2. Requirements
3. Installation
4. File Structure
5. Customization
6. Frequently Asked Questions (FAQ)
7. Support and Contact

## System Requirements

-Node.js >= 14.x
-React >= 18.x
-Modern web browser (Chrome, Firefox, Safari)
-Text Editor (VS Code recommended)

## Installation

### Step 1: Download and Extract

-Download the product page zip file from ThemeForest.
-Extract the zip file to your preferred location on your computer.

### Step 2: Install Dependencies

-Open your terminal and navigate to the project folder.
-Run the following command to install the required dependencies:

  ```
  npm install
  ```

### Step 3: Start the Development Server

-Run the following command to start the server:

  ```
  npm start
  ```

-Open your browser and navigate to `http://localhost:5173` to view the project.

## File Structure

Here's a breakdown of the folder and file structure:
/node_modules/
/src/
  ├── /assets/
  │   ├── /img/
  │   │   ├── /webp/
  │   └── ...
  ├── /components/
  │   ├── App.tsx
  │   ├── Cart.tsx
  │   ├── CartBtn.tsx
  │   ├── CategoryList.tsx
  │   ├── ConfirmOrder.tsx
  │   ├── Footer.tsx
  │   ├── Header.tsx
  │   ├── Preview.tsx
  │   ├── ScrollToTop.tsx
  │   ├── StoreItem.tsx
  │   └── TruckLoader.tsx
  ├── data.ts
  ├── declaration.d.ts
  ├── index.css
  ├── index.tsx
/.hintrc
/image-optimizer.mjs
/index.html
/package-lock.json
/package.json
/postcss.config.js
/README.md
/tailwind.config.js
/tsconfig.json
/vite.config.js

## Customization

### Changing Styles

- To change the main color scheme, navigate to `tailwind.config.js` and update the following variables:
- Brand: "#135aaf",
- Darkest: "#18181B",
- Dark: "#2A2A2A",
- Mid: "#858594",
- Light: "#E2E8F0",
- Lightest: "#FFFFFF",

- To customize fonts, edit the `font-family` property inside `tailwind.config.js`.

### Customizing Components

- The main components can be found in the `components/` directory. For example, to customize the header, modify `Header.tsx`.

## Adding New Products and Image

To add a new product to the page:

1. Open `src/data.tsx`.
2. Add your new images to src/assets/img/ folder.
3. Run the image optimization script by running the following command in your terminal: `node image-optimizer.mjs`,
 This script will convert new images  into WebP format and resize them for better performance.
4. After running the script, import the new WebP image from `src/assets/img/webp to data.ts`.
5. Add a new product object with the following attributes: `id`, `name`, `price`, `image`, and `description`.
6. Save the file, and the new product will appear on the page.

## FAQ

Q: How can I change the logo and title logo?
A: The logo image is located in the src/assets/img/logo.png file. Replace this file with your own logo while maintaining the same file name and dimensions. To change the title logo (favicon), you can update it in the fav folder.

Q: How do I reset the project to its original state?
A: If you need to reset the project back to its original state, run the following command:`git reset --hard`

## Support

If you have any questions or need assistance, feel free to reach out to us through the following channels:

Email: <adeolumiracle@yahoo.com>
WhatsApp: +2348078817017
Twitter (X): @MiracleAdeolu
We typically respond within 24-48 hours.

## Changelog

### Version 1.0.0

- Initial release.

Q: How can I resolve Vite JSX issues?
A: Vite enforces using JSX syntax inside `.jsx or .tsx` files. If you encounter an issue, simply rename any .js files to .jsx to resolve it.

Additional Notes
To learn more about Vite, head over to <https://vitejs.dev/>.
Happy Coding!
