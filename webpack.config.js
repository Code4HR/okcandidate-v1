// Webpack config file
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './assets/js/components/Index.jsx',
  output: {
    path: __dirname + '/assets/js',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: __dirname + '/assets',
        exclude: /bundle\.js$/
      }
    ],
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.png$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.jpg$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'localhost:8000'
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'GOOGLE_ANALYTICS'
    ])
  ]
}
