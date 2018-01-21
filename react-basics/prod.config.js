const merge = require('webpack-merge');

const prod = require('./webpack.prod.js');
const common = require('./webpack.common.js');

module.exports = merge(common, prod);