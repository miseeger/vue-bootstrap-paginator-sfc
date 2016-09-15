var path = require('path')
var config = require('./webpack.config.js')

config.entry = './src/vue-bootstrap-paginator.js';

config.output = {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'vbs-paginator.js',
    library: 'VueBsPaginator',
    libraryTarget: 'umd',
    umdNamedDefine: true
}

module.exports = config;