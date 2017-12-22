const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/js/app.js'),

  output: {
    filename: './js/app.bundle.js',
  },

  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      // {test: /\.scss/, loader: }
    ],
  },

};
