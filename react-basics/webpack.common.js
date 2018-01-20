const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  
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
    // , new HtmlWebpackPlugin({
    //   title: 'Production'
    // })
  ],

  module: {
    rules: [
        {enforce: 'pre', test: /\.js$/, loader: 'eslint-loader'}
        , { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};