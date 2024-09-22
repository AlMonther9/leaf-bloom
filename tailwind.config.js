const { theme } = require("tailwindcss/defaultConfig");
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
        greany: "#a8cdae",
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
        beige6: "#F3E9D2",
        beige7: "#d8c0c0",
      },
      backgroundImage: {
        sign: "url('/src/assets/signin.jpg')",
        signBg: "url('/src/assets/signup.jpg')",
        shopping: "url('src/assets/shopping.png')",
        sunflower: "url('src/assets/sunflower.jpg')",
      },
      fontFamily: {
        sans: ["Nunito", ...theme.fontFamily.sans],
        mono: ["Edu Australia VIC WA NT Handisfy ", ...theme.fontFamily.mono],
      },
    },
  },

  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
