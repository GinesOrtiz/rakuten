const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

dotenv.config()

const envVars = {
  __APP_URL__: JSON.stringify(process.env.APP_URL),
}
const htmlIndexPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  inject: 'body',
  template: 'src/index.html',
})

const config = {
  context: __dirname,
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg?$/,
        loader: 'url-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin(envVars),
    htmlIndexPlugin,
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: false,
    inline: false,
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: true,
  },
}

// PROD CONFIG
if (process.env.NODE_ENV === 'production') {
  config.mode = 'production'
  config.devtool = 'source-map'

  htmlIndexPlugin.minify = {
    collapseInlineTagWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
  }

  config.output = {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    chunkFilename: '[name].js',
    filename: '[name].js',
  }

  config.optimization = {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: 8,
          mangle: {
            reserved: Object.keys(envVars),
          },
          compress: {
            warnings: false,
          },
        },
      }),
    ],
  }
}

module.exports = config
