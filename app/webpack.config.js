const webpack = require('webpack');
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const path = require('path');
const buildPublic = path.resolve(__dirname,'../server/src/public');

module.exports = {
  entry: './src/app.js',
  output: {
    path: buildPublic,
    filename: 'bundle.js'
  },
  plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html'
        }),
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
	      test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
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
    extensions: ['', '.js', '.css','.scss']
  }
};
