/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vertex-bg': '#0A0A0A',
        'vertex-green': '#00FF88',
        'vertex-red': '#FF3B30',
        'vertex-card': '#121212',
        'vertex-border': '#1E1E1E',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundColor: {
        'vertex-bg': '#0A0A0A',
        'vertex-card': '#121212',
      },
      borderColor: {
        'vertex-green': '#00FF88',
        'vertex-red': '#FF3B30',
      },
      textColor: {
        'vertex-green': '#00FF88',
        'vertex-red': '#FF3B30',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
