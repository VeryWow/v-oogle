const merge = require('webpack-merge');
const common = require('./webpack.common');

const prod = {
}

module.exports = merge(common, prod);
