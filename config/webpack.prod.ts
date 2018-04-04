import { Configuration } from 'webpack';

import merge = require('webpack-merge');
import common = require('./webpack.common');

const prod: Configuration = {
}

export = merge(common, prod);
