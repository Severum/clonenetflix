const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const serverConfig = {
  entry: {
    server: path.join(__dirname, './server/server.js'),
  },
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
};

const clientConfig = {
  entry: {
    index: path.join(__dirname, './vue/src/index.js'),
  },
  mode: 'production', 
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
        include: path.resolve(__dirname, './vue/src')
      },
      {
        test: /.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

module.exports = [ serverConfig, clientConfig ];
