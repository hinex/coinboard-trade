const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PUBLIC_DIR = path.resolve(__dirname, 'public');

const config = {
  context: PUBLIC_DIR,
  entry: [
    './webapp/main.jsx',
    './styles/main.scss',
  ],
  output: {
    path: PUBLIC_DIR,
    filename: 'dist/bundle.js',
  },
  resolve: {
    extensions: ['.scss', '.css', '.js', '.jsx'],
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
    new ExtractTextPlugin({ filename: 'dist/style.css', allChunks: true }),
  ],
};

module.exports = config;
