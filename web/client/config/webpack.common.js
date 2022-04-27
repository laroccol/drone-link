const path = require('path');


module.exports = {
    // context: __dirname,
    entry: {
        app: ['babel-polyfill', path.resolve(__dirname, '../src/index')]
    },
    devServer: {
      contentBase: path.join(__dirname, '../../static/dist')
  },
    output: {
        path: path.resolve(__dirname, '../../static/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            loader: `url-loader?name=${path.resolve(__dirname, '../static/images/')}[name].[ext]`
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader"
              }
            ]
          }
        ],
      },
      resolve: {
        modules: ['node_modules', 'bower_components'],
        extensions: ['.mjs', '.js']
      },
      watchOptions: {
          aggregateTimeout: 300,
          poll: 1000
      }
};