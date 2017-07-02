var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: './entry.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'}
            {test: /\.js[x]?$/, loader: 'babel'}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};


