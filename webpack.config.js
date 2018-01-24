var webpack = require('webpack'),
    path = require('path'),
    CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        path.join(__dirname, '/app/index.js')
    ],
    devtool: "cheap-inline-module-source-map",
    devServer: {
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.css', '.scss']
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, exclude: /node_modules/, loader: "file-loader?name=[name].[ext]" }
        ]
    },
    output: {
        path: '/build',
        filename: 'app.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: path.join(__dirname, '/app/css'), to: path.join(__dirname, '/build/css') }
        ])
    ]
}
