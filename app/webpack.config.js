const webpack = require('webpack');
const path = require('path');
const buildPublic = path.resolve(__dirname,'../src/public/build');

module.exports = {
  entry: './webpack/app.js',
  output: {
    path: buildPublic,
    filename: 'bundle.js'
  },
  plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery'
        }),
  ],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader:'style!css'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  }
};
