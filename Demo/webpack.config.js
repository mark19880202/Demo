"use strict";

var webpack = require("webpack");
var config = {
    entry:{
        desktop: "./app/js/index.js"
    },
    output: {
        path: "./app/js/",
        publicPath: "./app/js/",
        filename: "main.js"
    },
    resolve:{},
    module: {
        noParse: [
            /\.min\.js/
        ],
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        },{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel",
            query:{
                presets:["es2015","react"],
                plugins:[
                    "transform-object-assign",
                    "array-includes",
                    "transform-object-rest-spread"
                ]
            }
          }

        ]
    },
    plugins:[
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({
            "$": "jquery",
            "jQuery": "jquery",
            "_": "underscore"
        })
    ]
};

module.exports = config;