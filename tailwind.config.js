/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // asegúrate de incluir tu código
  ],
  theme: {
    extend: {
      keyframes: {
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        bounceY: "bounceY 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
