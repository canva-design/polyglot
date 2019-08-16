require("dotenv").config();
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const projectRoot = process.cwd();

const folders = {
  src: resolve(projectRoot, "src"),
  shared: resolve(projectRoot, "src", "shared"),
  dist: resolve(projectRoot, "dist"),
};

const entry = {
  // The entry point for your UI code
  ui: resolve(folders.src, "ui", "index.ts"),
  // The entry point for your plugin code
  main: resolve(folders.src, "sandbox", "index.ts"),
};

// This is necessary because Figma's 'eval' works differently than normal eval
const getDevtool = mode =>
  mode === "production" ? false : "inline-source-map";

const output = {
  filename: "[name].js",
  path: folders.dist,
};

module.exports = (_, { mode }) => {
  const productionMode = mode === "production";
  const devtool = getDevtool(productionMode);

  return {
    devtool,
    entry,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          include: folders.src,
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-modules-typescript-loader" },
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
          ],
          include: folders.src,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
      alias: {
        figma: resolve(folders.src, "ui", "components", "figma"),
        sandbox: resolve(folders.src, "sandbox"),
        ui: resolve(folders.src, "ui"),
        shared: folders.shared,
        hooks: resolve(folders.src, "ui", "hooks"),
      },
    },
    output,
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(folders.src, "ui", "index.html"),
        filename: "ui.html",
        inlineSource: ".(js)$",
        chunks: ["ui"],
      }),
      new HtmlWebpackInlineSourcePlugin(),
    ],
  };
};
