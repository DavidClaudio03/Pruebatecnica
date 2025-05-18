// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "card-pulse": "card-pulse 15s infinite",
        shake: "shake 0.5s ease",
      },
      keyframes: {
        "card-pulse": {
          "0%,100%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.05)", opacity: "0.5" },
        },
        shake: {
          "0%,100%": { transform: "translateX(0)" },
          "20%,60%": { transform: "translateX(-4px)" },
          "40%,80%": { transform: "translateX(4px)" },
        },
      },
    },
  },
  plugins: [],
};
