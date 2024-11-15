/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "serif"],
      },
      colors: {
        DarkBlue: "hsl(209, 23%, 22%)",
        VeryDarkBlue: "hsl(207, 26%, 17%)",
        VeryDarkBlueTwo: "hsl(200, 15%, 8%)",
        DarkGray: "hsl(0, 0%, 52%)",
        VeryLightGray: "hsl(0, 0%, 98%)",
        White: "hsl(0, 0%, 100%)",
      },
      keyframes: {
        spinEarth: {
          '0%': { backgroundPositionX: '0px' },
          '100%': { backgroundPositionX: '380px' },
        },
      },
      animation: {
        spinEarth: 'spinEarth 2.5s linear infinite', // Define the spin animation with desired duration
      },
      backgroundSize: {
        custom: '380px', // Add custom background-size
      },
    }, // <-- Close the extend object here
  },
  plugins: [], // Move this outside the extend object
};
