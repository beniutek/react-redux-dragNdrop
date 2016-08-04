var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
        loaders: [
          { test: /\.jsx?$/, loader: 'babel', query: { presets:['es2015', 'react'] }, exclude: /node_modules/ },
          { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
  }
};
