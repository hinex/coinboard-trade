const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

const PUBLIC_DIR = path.resolve(__dirname, 'public');

const config = {
    context: PUBLIC_DIR,
    entry: [
        './webapp/main.jsx',
        './styles/main.scss',
    ],
    output: {
        path: `${PUBLIC_DIR}/dist`,
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.jpeg', '.scss', '.css', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties'],
                },
            },
            {
                test: /\.css?$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            },
            {
                test: /\.scss?$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!sass-loader' }),
            },
        ],
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourceMap: true }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ],
};

module.exports = config;
