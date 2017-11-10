const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject  : 'body'
})

module.exports = {
  entry: './src/app.js',

  output: {
    path    : path.resolve('dist'),
    filename: 'index_bundle.js'
  },

  module: {
    loaders: [
      {
        test   : /\.js$/,
        // use : 'babel-loader',
        exclude: /node_modules/
      },
      {
        test : /\.css$/,
        use  : ['style-loader', 'css-loader']
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