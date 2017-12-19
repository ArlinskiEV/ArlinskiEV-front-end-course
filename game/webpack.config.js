const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/js/app.js'),

    output: {
        filename: './js/app.bundle.js'
    }
};
