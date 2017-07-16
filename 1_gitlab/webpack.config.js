var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: './entry.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.BannerPlugin('Created by PetnaKanojo'),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
/*          {
            test: /\.js$/,
            loader: 'babel-core',
            query: {
              presets: ['es2015', 'react']
            }
          },
          */
            {test: /\.css$/, loader: 'style-loader!css-loader'},
 //           test: /\.js[x]?$/, loader: 'babel'}
/*            {
                test: /\.jsx?$/,
                loader: 'babel-core',
                query: {
                    presets: ['es2015']
                }
            }*/
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            }
        ],

    }
};
