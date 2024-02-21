/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
      gridTemplateColumns: {
        15: "repeat(1,minmax(150px,1fr))",
        16: "repeat(auto-fit,minmax(200px,1fr))",
        17: "repeat(auto-fit,minmax(220px,1fr))",
      },
    },
    fontFamily: {
      custom: ["Arial", "sans-serif"],
    },
  },
  plugins: [],
};
