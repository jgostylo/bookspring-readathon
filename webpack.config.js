'use strict';

var webpack = require('webpack');

module.exports = {
    entry: {
        app: './app/app.js',
        vendor: './app/vendor.js'
    },
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    module: {
        loaders: [
            { test: /\.html/, loader: 'raw' },
            { test: /\.js/, loader: 'ng-annotate' },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', './dist/vendor.js')
    ]
};