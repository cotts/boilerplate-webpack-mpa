const webpack = require('webpack')
  , path = require('path')
  , glob = require("glob")
  , ExtractTextPlugin = require("extract-text-webpack-plugin")
  , HtmlWebpackPlugin = require('html-webpack-plugin');

const createTemplate = (el) => new HtmlWebpackPlugin({ filename: path.basename(el, '.pug') + '.html', hash: true, template: el });

const listTemplates = () => glob.sync("./src/views/*.pug").map(createTemplate);

module.exports = {
  entry: {
    app: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'assets/js/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] })
      },
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader", options: { presets: ["es2015"] } }],
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader?pretty=true'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: ['file-loader?hash=sha512&digest=hex&name=assets/img/[hash].[ext]', 'image-webpack-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    compress: true,
    clientLogLevel: 'none',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'assets/css/app.css',
      disable: false,
      allChunks: true,
      publicPath: 'assets/css'
    })
  ]
    .concat(listTemplates())

}

