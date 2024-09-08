const { theme } = require("tailwindcss/defaultConfig");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#DAD7CD",
        secondary: "#A3B18A",
        tertiary: "#588157",
        quaternary: "#3A5A40",
        quinary: "#344E41",
      },
      backgroundImage: {
        smallland: "url('landsmall.jpg')",
        land: "url('landbg.jpg')",
        sign: "url('signin.jpg')",
        signBg: "url('signup.jpg')",
      },
      fontFamily: {
        sans: ["Nunito", ...theme.fontFamily.sans],
        mono: ["Edu Australia VIC WA NT Handisfy ", ...theme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
