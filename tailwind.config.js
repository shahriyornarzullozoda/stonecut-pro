/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3f51b5",
        "background-light": "#f1f5f9",
        "background-dark": "#0f172a",
        "accent-teal": "#14b8a6",
        "accent-purple": "#8b5cf6",
        "accent-orange": "#f97316",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

