/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Add your brand colors here
        "cognizant-midnight": "#000048", // Replace with your exact dark blue hex
        "cognizant-turquoise": "#00e5ff", // Replace with your exact turquoise hex
      },
    },
  },
  plugins: [],
};
