const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  plugins: [
    new MinifyPlugin()
    , new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};


// --------------------------------------------



/*
const path = require('path');
const UglifyJSPlugin = require('webpack').optimize.UglifyJsPlugin;

module.exports = {
    entry: path.join(__dirname, 'app.js'),
    output: {
        filename: 'index.js'
        //, path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {enforce: 'pre', test: /\.js$/, loader: 'eslint-loader'}
            , { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};
*/