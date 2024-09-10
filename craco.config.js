const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@magicui": path.resolve(__dirname, "../components/magicui"),
    },
  },
};
