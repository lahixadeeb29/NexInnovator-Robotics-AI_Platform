/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nex: {
          bg: "#050d1a", deep: "#030a14", card: "#0a1628",
          elevated: "#0f1e35", border: "#1a2d4a",
          cyan: "#00d4ff", violet: "#7c3aed", amber: "#f0a500",
          rose: "#ff4d6d", emerald: "#10b981",
          text: "#e2e8f0", muted: "#64748b",
        },
      },
      fontFamily: {
        display: ["Orbitron", "monospace"],
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
