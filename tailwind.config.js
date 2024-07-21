/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {},
      colors: {
        black: "#292219",
        background: "#141417",
        foreground: "#ECEDEE",
        divider: "#ffffff26",
        focus: "#006FEE",
        content1: "#18181b",
        content2: "#27272a",
        content3: "#3f3f46",
        content4: "#52525b",
        default: "#3f3f46",
        primary: "#006FEE",
        primaryHover: "#005BC4",
        secondary: "#9353d3",
        success: "#17c964",
        successDark: "#0e793c",
        warning: "#f5a524",
        danger: "#f31260",
        borderSecondary: "#71717a",
        textSecondary: "#a1a1aa",
        header: "#FBDBA7",
      },
      boxShadow: {},

      screens: {},
    },
  },
};
