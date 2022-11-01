const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const IS_PROD = process.env.NODE_ENV === "production";

const plugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  })
];

const babelLoaderOptions = { plugins: [] };

if(!IS_PROD) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new ReactRefreshWebpackPlugin());
  babelLoaderOptions.plugins.push(require.resolve("react-refresh/babel"))
}


module.exports = {
  mode: IS_PROD ? "production" : "development",
  entry: "./src/index.tsx",
  devServer: {
    hot: true
  },
  target: "web",
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins,
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".tsx", ".ts", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: babelLoaderOptions
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.png|svg|jpg|gif|json$/,
        use: ["file-loader"]
      }
    ]
  }
};
