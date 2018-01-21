const merge = require('webpack-merge');

const prod = require('./webpack.prod.js');
const dev = require('./webpack.dev.js');
const common = require('./webpack.common.js');

const add = process.env.NODE_ENV === 'production'
? prod
: dev;

module.exports = merge(common, add);