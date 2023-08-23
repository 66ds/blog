const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('api',resolve('src/api'))
            .set("store",resolve('src/store'))
            .set('utils',resolve('src/utils'))
            .set('views',resolve('src/views'))
            .set('assets',resolve('src/assets'))
            .set('mixins',resolve('src/mixins'))
            .set("router",resolve('src/router'))
            .set('plugins',resolve('src/plugins'))
            .set('constants',resolve('src/constants'))
            .set("directives",resolve('src/directives'))
            .set('components',resolve('src/components'))
        // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
    },
    publicPath: "/" ,
};
