const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib')
    },
    module: {

        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: [{
                    loader: 'babel-loader',
                    options:{  
                        presets:[  
                            "env","react","stage-3"
                        ]  
                    }  
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS
                ]
            }, {
                test: /\.less$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "less-loader" // compiles Sass to CSS
                ]
            }
        ]
    },
};

