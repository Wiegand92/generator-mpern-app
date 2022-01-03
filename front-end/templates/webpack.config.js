const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')

// In dev mode if env.NODE_ENV is developer //
const devMode = process.env.NODE_ENV === 'development';

const plugins = [
  new webpack.ProvidePlugin({
    React: 'react'
  }),
  new HtmlWebpackPlugin({
    template: 'index.html',
  }),
];

// Enable MiniCss in production only //
if (!devMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'scripts/style.css',
    }),
  );
}

module.exports = {
  mode: devMode ? 'development' : 'production',

  entry: './index.js',

  output: {
    filename: 'scripts/index.js',
    path: path.resolve(__dirname, '<%= outputPath %>'),
    clean: true,
  },

  plugins,
  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          //If we're in dev-mode, use inline-styles, else extract to separate css file
          devMode
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, '<%= outputPath %>'),
                },
              },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080, <%- backend ? `
    proxy: { '/': 'http://localhost:4200' },` : null %>
  },

  devtool: 'cheap-module-source-map',
};
