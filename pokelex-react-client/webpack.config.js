const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const IS_PROD = process.env.NODE_ENV === "production";

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new CopyPlugin({
    patterns: [{ from: "public", to: "./" }],
  })
];

const babelLoaderOptions = { plugins: [] };

if (!IS_PROD) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
  babelLoaderOptions.plugins.push(require.resolve("react-refresh/babel"));
}

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: IS_PROD ? "production" : "development",
  optimization: {
    usedExports: IS_PROD ? true : false
  },
  entry: "./src/index.tsx",
  devServer: {
    hot: true,
  },
  target: "web",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins,
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: babelLoaderOptions,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.png|svg|jpg|gif|json$/,
        use: [
          {
            loader: "file-loader",
            // options: {
            //   publicPath: path.resolve(__dirname, "/public/img"),
            // },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ],
  },
};
