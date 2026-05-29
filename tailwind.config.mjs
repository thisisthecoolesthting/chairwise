import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,svelte,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#F4EFE6",
          100: "#EAE5DD",
          200: "#DCD7CF",
        },
        terracotta: {
          400: "#9F5B30",
          500: "#8A4F2A",
          600: "#714122",
        },
        primary: { DEFAULT: "#1B4D6E" },
        accent: { DEFAULT: "#8A4F2A" },
        sage: { 400: "#8FA888", 500: "#6F8B6A", 600: "#566F52" },
        rose: { deep: "#0F172A" },
        ink: {
          900: "#0B1120",
          700: "#334155",
          500: "#64748B",
        },
      },
      maxWidth: {
        prose: "68ch",
      },
            typography: {
        DEFAULT: { css: { maxWidth: "68ch" } },
        ink: { css: { color: "#4A4340" } },
      },
      fontFamily: {
        display: ['Fraunces', "Georgia", "serif"],
        sans: ['Inter', "system-ui", "sans-serif"],
        body: ['Inter', "sans-serif"],
        mono: ['JetBrains Mono', "monospace"],
      },
    },
  },
  plugins: [typography],
};
