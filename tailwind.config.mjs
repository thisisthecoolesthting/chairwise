/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#475569" },
        accent: { DEFAULT: "#14B8A6" },
        cream: "#F8FAFC",
        ink: "#0F172A",
      },
      fontFamily: {
        display: ["Space Grotesk", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
