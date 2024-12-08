module.exports = {
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      { runtime: "automatic", importSource: ["@emotion/react"] },
    ],
    "react-require",
  ],
};
