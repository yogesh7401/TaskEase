/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#283618",
        "secondary": "#bc6c25",
        "primary-light": "#606c38",
        "secondary-light": "#dda15e",
        "light": "#fefae0",
      }
    },
  },
  plugins: [],
};
