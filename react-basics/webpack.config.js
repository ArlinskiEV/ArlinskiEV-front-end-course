const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const merge = require('webpack-merge');
const prod = require('./webpack.prod.js');
const dev = require('./webpack.dev.js');
const common = {
  
  entry: path.join(__dirname, 'src/app.js'),
  
  // entry: {
  //   app: './app.js'
  // },
  output: {
    filename: 'index.js',
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

const add = process.env.NODE_ENV === 'production'
? prod
: dev;




module.exports = merge(common, add);