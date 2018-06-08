const path = require('path');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        libraryTarget: 'umd'
    },
    plugins: [
        new ExtractTextPlugin('index.css'),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                include: [/src/, /example/],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?modules&localIdentName=[local]-[hash:base64:5]", "less-loader"]
                })
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
};
if (process.env.MY_NODE_ENV === 'example') {
    config = {
        ...config,
        entry: './example/index.js',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './docs',
            hot: true
        },

        plugins: [
            ...config.plugins,
            // new CleanWebpackPlugin(['docs']),
            // new HtmlWebpackPlugin({
            //     title: 'Development'
            // }),
        ],
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'docs')
        },
        resolve: {
            alias: {
                scoreboard: path.resolve(__dirname, 'src/scoreboard'),
            }
        },
        externals:{}
    };
    console.log('config.module.rules', config.module.rules)
}

module.exports = config;





