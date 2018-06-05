const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let config = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "less-loader" // compiles Sass to CSS
                ]
            }, {
                test: /(\.jsx|\.js)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "env", "react", "stage-0"
                        ]
                    }
                }]
            }
        ]
    },
};
if (process.env.MY_NODE_ENV === 'develop') {
    config = {
        ...config,
        module: {
            rules: [
                ...config.module.rules,
            ]
        },
        entry: './example/index.js',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './dist',
            hot: true
        },
        plugins: [
            ...config.plugins,
            new CleanWebpackPlugin(['dist']),
            new HtmlWebpackPlugin({
                title: 'Development'
            }),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin()
        ],
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist')
        }
    };
}
module.exports = config;

