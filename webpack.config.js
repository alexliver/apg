var webpack = require('webpack');

var config = {
  entry: './index.jsx',
  devtool: 'source-map',
  debug: true,
  
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.json$/, loader: "json-loader"}
    ]
  },
  output: {
    path: './dist',
    filename: 'index.bundle.js'
  },

  /*
   plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      })
    ]
  */
};

module.exports = config;
