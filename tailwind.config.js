/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Brand: "#135aaf",
        Darkest: "#18181B",
        Dark: "#2A2A2A",
        Mid: "#858594",
        Light: "#E2E8F0",
        Lightest: "#FFFFFF",
        MidTwo: "#ebf4ff"
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
      screens: {
        ml: {'min': '379px', 'max': '450px'},
        xl: {'min': '1200px', 'max': '1440px'},
        xxl: {'min': '1290px', 'max': '1536px'}
      },
      animation: {
        flipinx: 'flipinx .25s ease 0s 1 normal forwards',
        fadeForward: 'fadeForward .25s ease 0s 1 normal none',
        slideOut: 'slideOut .25s ease 0s 1 normal none',
        fadeIn: 'fadeIn .25s ease 0s 1 normal forwards',
        fadeInAnim: 'fadeInAnim 1s ease 0s 1 normal forwards',
        fadeInBackWard: 'fadeInBackWard .25s ease 0s 1 normal forwards',
        slideIn: 'slideIn .25s ease 0s 1 normal forwards',
        truckMotion: 'truckMotion 1s linear infinite',
        roadAnimation: 'roadAnimation 1.4s linear infinite',
      },
      keyframes: {
        flipinx: {
          '0%': {
            opacity: "0",
            transform: "scale(0.7)",
          },
          '100%': {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        fadeForward: {
          '0%': {
            opacity: "0",
            transform: "scale(0.6)",
          },
          '100%': {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        slideOut: {
          '0%': {
            opacity: "1",
            transform: "translateX(0)",
          },
          '100%': {
            opacity: "0",
            transform: "translateX(-250px)",
          },
        },
        fadeIn: {
          '0%': {
            opacity: "0",
          },
          '100%': {
            opacity: "1",
          },
        },
        fadeInAnim: {
          '0%': {
            opacity: "0",
          },
          '100%': {
            opacity: "1",
          },
        },
        fadeInBackWard: {
          '0%': {
            opacity: "0",
          },
          '100%': {
            opacity: "1",
          },
        },
        slideIn: {
          '0%': {
            opacity: "0",
            transform: "translateX(-50px)"
          },
          '100%': {
            opacity: "1",
            transform:" translateX(0)"
          },
        },
        truckMotion: {
          '0%': {
            transform: "translateY(0px)",
          },
          '50%': {
            transform: "translateY(3px)",
          },
          '100%': {
            transform: "translateY(0px)",
          },
        },
        roadAnimation: {
          '0%': {
            transform: "translateX(0px)",
          },
          '100%': {
            transform: "translateX(-350px)",
          },
        },
      },
    },
  },
  plugins: [],
}
