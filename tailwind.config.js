/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [

    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    "./node_modules/flowbite-react/**/*.js",
  ],
  extend: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
  theme: {},
};
