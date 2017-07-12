const path = require('path');
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

let files = ()=> glob.sync("./src/views/*.pug").map((el) =>  new HtmlWebpackPlugin({ filename: path.basename(el, '.pug')+'.html', hash: true, template: el }));
    


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
        test: /\.pug$/,
           loader: ['html-loader', 'pug-html-loader?pretty=true']
      },
        ]
    },
    plugins: [new ExtractTextPlugin({
        filename: 'assets/css/app.css',
        disable: false,
        allChunks: true
    })].concat(files())

}

