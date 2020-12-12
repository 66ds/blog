import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueParticles from 'vue-particles'
import animated from 'animate.css';
import 'element-ui/lib/theme-chalk/index.css';
// 在入口文件中引入基本样式
import './assets/styles/reset.css'
import './assets/styles/border.css'
import router from './router/index'
import store from './store/index'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.component('happy-scroll', HappyScroll)
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(animated);
Vue.use(VueQuillEditor);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
