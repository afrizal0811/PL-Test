const CracoAlias = require("craco-alias");
const path = require("path");

module.exports = {
  babel: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-logical-assignment-operators",
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true, // or false, but be consistent
        },
      ],
      [
        "@babel/plugin-proposal-private-methods",
        {
          loose: true, // should match the above value
        },
      ],
    ],
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules[0].include = [
        path.resolve("src"),
        path.resolve("node_modules/@mui"), // Include @mui for transpiling
      ];
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@mui/styled-engine": "./node_modules/@mui/styled-engine-sc",
        },
      },
    },
  ],
};
