const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './scripts/init.js',
    output: {
        filename: 'packed.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimize: true,
    }
};