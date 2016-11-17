module.exports = {
  entry: './index.jsx',
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  output: {
    path: './dist',
    filename: 'index.bundle.js'
  }
};

