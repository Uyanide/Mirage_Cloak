const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        main: './scripts/init.js',
        vendor: [
            './scripts/libs/jpegEncoder.js',
            './scripts/libs/pngLib.js',
        ]
    },
    output: {
        filename: '[name].packed.js',
        path: path.resolve(__dirname, './public/src'),
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
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ],
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/')
        }
    },
    mode: 'production',
    // devtool: 'source-map',
    optimization: {
        minimize: true,
    }
};