const merge = require('webpack-merge');

const dev = require('./webpack.dev.js');
const common = require('./webpack.common.js');

module.exports = merge(common, dev);