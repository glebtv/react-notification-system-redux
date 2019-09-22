var path = require('path');
var webpack = require('webpack');

var JS_REGEX = /\.js$|\.jsx$|\.es6$|\.babel$/;

console.log("build for env", process.env.NODE_ENV)

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: 'cheap-module-source-map',
  entry: [
    './src/notifications.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: process.env.NODE_ENV == "production" ? 'react-notification-system-redux.min.js' : 'react-notification-system-redux.js',
    libraryTarget: 'umd',
    library: "ReactNotificationSystemRedux"
  },
  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'react-redux': {
        root: 'ReactRedux',
        commonjs2: 'react-redux',
        commonjs: 'react-redux',
        amd: 'react-redux'
      }
    },
    {
      'rs-react-notification-system': {
        root: 'RsReactNotificationSystem',
        commonjs2: 'rs-react-notification-system',
        commonjs: 'rs-react-notification-system',
        amd: 'rs-react-notification-system'
      }
    }
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', 'src']
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
      }
    ]
  }
};
