import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';
import paths from './config';

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(paths.src, 'index.html'),
    name: 'index.html',
    inject: 'body'
});

export default {
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
            { test: /\.css$/,  include: /node_modules/, loader: "style-loader!css-loader" },
            { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, exclude: /node_modules/, loader: "file-loader?name=[name].[ext]" }
        ]
    },
    output: {
        path: paths.public,
        filename: 'app.js'
    },
    plugins: [
        HTMLWebpackPluginConfig,
        new CopyWebpackPlugin([
            { from: path.join(paths.src, "css"), to: path.join(paths.public, "css") },
            { from: path.join(__dirname + "/node_modules/leaflet/dist", "images"), to: path.join(paths.public + "/css", "images") },
            { from: __dirname + "/node_modules/leaflet/dist/leaflet.css", to: path.join(paths.public, "css") },
            { from: __dirname + "/node_modules/leaflet.markercluster/dist/MarkerCluster.css", to: path.join(paths.public, "css") },
            { from: __dirname + "/node_modules/leaflet-dialog/Leaflet.Dialog.css", to: path.join(paths.public, "css") },
            { from: __dirname + "/node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css", to: path.join(paths.public, "css") }
        ])
    ]
}
