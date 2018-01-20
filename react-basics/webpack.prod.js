const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJSPlugin = require('webpack').optimize.UglifyJsPlugin;
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    // new UglifyJSPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //     minimize: true,
    //     debug: false
    //   }),
    //   new UglifyJSPlugin({
    //     uglifyOptions: {
    //       beautify: false,
    //       ecma: 6,
    //       compress: true,
    //       comments: false
    //     }
    //   })
    new MinifyPlugin()
    , new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});


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