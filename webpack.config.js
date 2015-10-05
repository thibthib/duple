module.exports = {
  entry: {
    'app': __dirname + '/scripts/app.js'
  },
  output: {
    path: __dirname + '/assets/',
    publicPath: 'assets/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.json$/, loader: 'json'},
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=[hash:6].[ext]!image-webpack?progressive=true' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.js']
  }
};