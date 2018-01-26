const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
    , hot: true
    , historyApiFallback: true
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    })
    , new webpack.NamedModulesPlugin()
    , new webpack.HotModuleReplacementPlugin()
  ]
};


// --------------------------------------



/*
const path = require('path');

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
    }
};
*/