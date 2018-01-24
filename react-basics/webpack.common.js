const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
  
  // entry: {
  //   app: path.join(__dirname, './src/app.js'),
  // },
  entry: ['babel-polyfill', 'react-hot-loader/patch', './src/app.js'],

  output: {
    filename: '[name].bundle.[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  
  plugins: [
    new CleanWebpackPlugin(['dist'])
    , new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],

  module: {
    rules: [
        {enforce: 'pre', test: /\.js$/, loader: 'eslint-loader'}
        , { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};

module.exports = common;