/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#14171C",
          darker: "#0B0D10",
          orange: "#a50046",
          orangeDark: "#a50046",
          green: "#2E8B4E",
          cream: "#f2f2f2",
          ink: "#1B1B18",
          muted: "#6B6B65",
        },
      },

      fontFamily: {
        display: ['"Sora"', "ui-sans-serif", "system-ui", "sans-serif"],
        body: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },

      borderRadius: {
        card: "1rem",
      },
    },
  },

  plugins: [],
};

export default config;
