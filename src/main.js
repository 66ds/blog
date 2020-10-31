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
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueParticles);
Vue.use(animated)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
