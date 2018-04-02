const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../docs')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
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
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // No need for hmtl-transpiler since everything is parsed into functional components via vue-loader
      'vue$': 'vue/dist/vue.runtime.esm.js',

      // Other aliases go there
      '@': path.resolve(__dirname, '../src', './'),
      '~': path.resolve(__dirname, '../src', './assets'),
      'views': path.resolve(__dirname, '../src', './views'),
      'components': path.resolve(__dirname, '../src', './views/components'),
      'router': path.resolve(__dirname, '../src', './router'),
      'plugins': path.resolve(__dirname, '../src', './plugins'),
    }
  },
  cache: true,
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs')
    }),
  ]
}

module.exports = config;
