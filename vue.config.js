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
            .set('styles',resolve('src/assets/styles'))
            .set('api',resolve('src/api'))
            .set('common',resolve('src/components/common'))
            .set('person',resolve('src/components/person'))
        // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
    }
};
