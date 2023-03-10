var path = require('path');
var nodeEnv = process.env.NODE_ENV || 'development';
var isDev = (nodeEnv !== 'production');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

var config = {
  //mode: "development",
  entry: {
    dist: './scripts/entry.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'analysis.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
      //   test: /\.(scss|css)$/,
      //   use: ['style-loader', 'css-loader', 'sass-loader'],
      //   include: path.join(__dirname, 'src/styles')
      // //   use: [{
      // //     loader: 'style-loader', // inject CSS to page
      // //   }, 
      // //   {
      // //     loader: 'css-loader', // translates CSS into CommonJS modules
      // //   },  
      // //   {
      // //     loader: 'sass-loader' // compiles Sass to CSS
      // //   }]
      // },
      
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
  
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: path.join(__dirname, 'src/fonts'),
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  }
  ,
  plugins: [
    new MiniCssExtractPlugin({
    filename: "analysis.css"
      }), 
    new NodePolyfillPlugin()
    ]
};

if(isDev) {
  config.devtool = 'inline-source-map';
}

module.exports = config;
