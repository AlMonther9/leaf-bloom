const { theme } = require("tailwindcss/defaultConfig");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DAD7CD",
        secondary: "#A3B18A",
        tertiary: "#588157",
        quaternary: "#3A5A40",
        quinary: "#344E41",
        gold: "#FFCB05",
        gold2: "#FFC266",
        gold3: "#FFB523",
        gold4: "#FFA800",
        gold5: "#FF9B00",

        beige: "#EAD7BA",
        beige2: "#fae7b0",
        beige3: "#F9E7D4",
        beige4: "#F8D7C7",
        beige5: "#F7C6B8",
        orangi: "#964F1E",
        orangsec: "#B55D20",
        browny: "#6C584C",
        ccoki: "#A98467",
        pinky: "#E1C1B5",
        darkpink: "#9C6955",
      },
      backgroundImage: {
        smallland: "url('/src/assets/landsmall.jpg')",
        land: "url('/src/assets/landbg.jpg')",
        sign: "url('/src/assets/signin.jpg')",
        signBg: "url('/src/assets/signup.jpg')",
        shopping: "url('src/assets/shopping.png')",
        sunflower: "url('src/assets/sunflowrs.jpg')",
      },
      fontFamily: {
        sans: ["Nunito", ...theme.fontFamily.sans],
        mono: ["Edu Australia VIC WA NT Handisfy ", ...theme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
