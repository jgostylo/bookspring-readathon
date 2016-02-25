'use strict';

var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = {
    entry: './app/app.js',
    devServer: {
        historyApiFallback: true
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
        new AppCachePlugin({
            cache: ['dist/bootstrap/css/bootstrap.min.css'],
            settings: ['prefer-online'],
            output: 'cache.manifest'
        })
    ]
};