export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", "sans-serif"],
        secondary: ["Work Sans", "sans-serif"],
      },
      colors: {
        body: {
          dark: "#0B1423",
          light: "#FDFDFD",
        },
        green: {
          1: "#8EEB78",
          2: "#6FB15F",
          3: "#418B2F",
        },
        purple: {
          light: "#5333F6",
          dark: "#2F365B",
        },
        blue: {
          dark: "#07193C",
        },
        black: {
          bright: "#09101B",
        },
        text: {
          white: "#FDFDFD",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};
