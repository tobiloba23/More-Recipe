import path from 'path';
import webpack from 'webpack';
     
let config = {
    entry: {
        userProfile: './template/user_profile/js/index.js',
        homePage: './template/home_page/js/index.js',
    },
     output: {
         path: path.resolve(__dirname, 'template/build'),
         filename: '[name].bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['env', 'react']
                 }
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };

 export default config;