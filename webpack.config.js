const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    first: './src/js/first.js',
    second: './src/js/second.js',
  },
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'second page',
      template: "./src/second.html",
      filename: "second.html",
      chunks: ['second']
    }),
    new HtmlWebpackPlugin({
      title: 'first page',
      template: "./src/first.html",
      filename: "first.html",
      chunks: ['first']
    }),
    new HtmlWebpackPlugin({
      title: 'index page',
      template: "./src/index.html",
      filename: "index.html",
      chunks: []
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    // contentBase: './dist/first.html',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
};
