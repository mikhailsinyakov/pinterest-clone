const webpack = require('webpack');

module.exports = {
    entry: './public/index.js',
    output: {
        path: __dirname + '/public',
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