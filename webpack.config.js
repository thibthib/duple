module.exports = {
  entry: {
    'app': __dirname + '/scripts/app.js'
  },
  output: {
    path: __dirname + '/assets',
    publicPath: '/assets',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.json$/, loader: 'json'},
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.js']
  }
};