var path = require('path');
var webpack = require('webpack');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: 'cheap-module-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './example/src/example.js'
  ],
  output: {
    path: path.join(__dirname, 'example/build'),
    filename: 'app.js',
    publicPath: 'build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.sass'],
    modules: ['node_modules', 'src'],
    alias: {
      'react-notification-system-redux': path.resolve(__dirname, "src", "notifications.js"),
    }
  },
  module: {
    rules: [
      {
        test: JS_REGEX,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example/src')
        ],
        loader: 'babel-loader?presets[]=airbnb'
      },
      {
        test: /\.sass$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                //indentedSyntax: "sass",
                includePaths: [
                  path.resolve(__dirname, "example/src"),
                ]
              }
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: __dirname + "/example/src/",
  },
};
