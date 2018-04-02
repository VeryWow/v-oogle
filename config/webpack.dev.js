const merge = require('webpack-merge');
const common = require('./webpack.common');

const dev = {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}

module.exports = merge(common, dev);
