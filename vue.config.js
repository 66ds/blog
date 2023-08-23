/* eslint-disable no-undef */
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            // 需要重启 IDE
            .set('assets',resolve('src/assets'))
            .set('api',resolve('src/api'))
            .set('components',resolve('src/components'))
            .set('mixins',resolve('src/mixins'))
            .set('utils',resolve('src/utils'))
            .set('partten',resolve('src/partten'))
        // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
    },
    publicPath: "/" ,
};
