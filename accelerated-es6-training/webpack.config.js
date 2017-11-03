const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject  : 'body'
})

module.exports = {
  entry: './src/index6.js',

  output: {
    path    : path.resolve('dist'),
    filename: 'index_bundle.js'
  },

  module: {
    loaders: [
      {
        test   : /\.js$/,
        // loader : 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },

  devServer: {
    contentBase       : path.join(__dirname, 'dist'),
    compress          : true,
    hot               : false,
    clientLogLevel    : "none",
    watchContentBase  : true,
    stats             : 'errors-only',
    open              : true,
    historyApiFallback: true,
  },

  plugins: [HtmlWebpackPluginConfig]
}