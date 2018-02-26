const webpack = require('webpack');

module.exports = {
    entry: __dirname + '/app/src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'script.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['react']
            }
        }]
    },
    mode: 'development'
};