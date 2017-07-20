var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: './src/scripts/entry.js',
    output: {
        filename: './src/scripts/bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: './',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

