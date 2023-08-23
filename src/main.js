import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueParticles from 'vue-particles'
import animated from 'animate.css';
import APlayer from '@moefe/vue-aplayer';

import 'element-ui/lib/theme-chalk/index.css';
import message from '@/plugins/message'
import router from './router/index'
import store from './store/index'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css';
//引入全局插件
import plugin from '@/plugins/drag'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(animated);
Vue.use(VueQuillEditor);
Vue.use(plugin, Vue);
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$message = message //加了这个可能好看点吧
  }
}).$mount('#app')
