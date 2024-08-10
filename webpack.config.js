const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/scripts/init.js',
    output: {
        filename: '[name].[contenthash].js',
        // filename: 'main.js',
        path: path.resolve(__dirname, './public'),
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
                        plugins: ['@babel/plugin-syntax-dynamic-import'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.worker\.js$/, // 添加这一部分
                use: {
                    loader: 'worker-loader',
                    options: {
                        filename: '[name].[contenthash].worker.js',
                    },
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'head',
        }),
    ],
    resolve: {
        fallback: {
            buffer: require.resolve('buffer/')
        }
    },
    mode: 'production',
    // mode: 'development',
    // devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            // terserOptions: {
            //     compress: {
            //         drop_console: true,
            //     },
            // },
        })],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './public'),
        },
        compress: true,
        port: 9000,
    },
};