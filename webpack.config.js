const path = require('path');
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const createTemplate = (el)=> new HtmlWebpackPlugin({ filename: path.basename(el, '.pug')+'.html', hash: true, template: el });

const listTemplates = ()=> glob.sync("./src/views/*.pug").map(createTemplate);

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
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader', 'sass-loader'],
                    publicPath: './dist/assets/css'
                })
            },
             {
        test: /\.js$/,
        use: [{
          loader: "babel-loader",
          options: { presets: ["es2015"] }
        }],
      },
          {
        test: /\.pug$/,
           loader: ['html-loader', 'pug-html-loader?pretty=true']
      },
        ]
    },
    plugins: [new ExtractTextPlugin({
        filename: 'assets/css/app.css',
        disable: false,
        allChunks: true
    })].concat(listTemplates())

}

