import { Configuration } from 'webpack';

import path = require('path');
import HtmlWebPackPlugin = require('html-webpack-plugin');
import CopyWebPackPlugin = require('copy-webpack-plugin');

/*// Importing aliases from tsconfig... */ {
  const tsconfig = require('../tsconfig.json');
  const paths: { [key: string]: string[] } = tsconfig.compilerOptions.paths;
  var aliases: { [key: string]: string } = {};

  console.warn('Available dir aliases:');
  for (let _path in paths) {
    aliases[_path] = path.resolve(__dirname, '../src', paths[_path][0]);
    console.log(_path + ':', path.resolve(__dirname, '../src', paths[_path][0]));
  }
  console.log('');
} //

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../docs')
  },
  module: {
    rules: [
      {
        test: /\.vue?$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css?$/,
        loader: 'css-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
    alias: {
      // No need for hmtl-transpiler since everything is parsed into functional components via vue-loader
      'vue$': 'vue/dist/vue.runtime.esm.js',

      // Other aliases go there
      ...aliases
    }
  },
  cache: true,
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs')
    }),
    new CopyWebPackPlugin([
      { from: path.resolve(__dirname, '../src/CNAME'), to: path.resolve(__dirname, '../docs') }
    ])
  ]
}

export = config;
