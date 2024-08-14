/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Brand: "#EF4444",
        Darkest: "#18181B",
        Dark: "#3b3b43",
        Mid: "#858594",
        Light: "#E2E8F0",
        Lightest: "#FFFFFF",
      },
      fontFamily: {
        Nunito: ["Nunito"," sans-serif"]
      }
    },
  },
  plugins: [],
}