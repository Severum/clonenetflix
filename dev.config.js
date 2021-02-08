const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')

const serverConfig = {
  entry: {
    server: path.join(__dirname, './server/server.js'),
  },
  mode: 'development',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
      new NodemonPlugin({
        script: './dist/server.js',
      }),
  ],
};

const clientConfig = {
  entry: {
    index: path.join(__dirname, './vue/src/index.js'),
  },
  mode: 'development',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'public/fonts/'
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
};

module.exports = [ serverConfig, clientConfig ];
