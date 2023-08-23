import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import VueParticles from 'vue-particles';
import animated from 'animate.css';
import APlayer from '@moefe/vue-aplayer';
import 'element-ui/lib/theme-chalk/index.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'mavon-editor/dist/markdown/github-markdown.min.css';
import VideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';

import VueQuillEditor from 'vue-quill-editor'
import message from '@/plugins/message';
import router from '@/router/index';
import store from '@/store/index';

// 引入全局插件和指令
import '@/directives/v-click';
import '@/directives/v-drag';
import '@/directives/v-custom-loading';

Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(animated);
Vue.use(VueQuillEditor);
Vue.use(APlayer, {
  defaultCover: 'https://github.com/u3u.png',
  productionTip: true,
});
Vue.use(VideoPlayer);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$message = message;
  },
}).$mount('#app');