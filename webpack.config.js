const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
    new WebpackUglifyJsPlugin({
      compress: { warnings: false },
      cacheFolder: path.resolve(__dirname, '/cache/uglify'),
      sourceMap: true,
      include: /\.min\.js$/,
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
  ],
};

module.exports = config;
