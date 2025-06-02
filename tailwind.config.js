/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#282c34',
        'terminal-text': '#abb2bf',
        'terminal-green': '#98c379',
        'terminal-blue': '#61afef',
        'terminal-purple': '#c678dd',
      },
    },
  },
  plugins: [],
}