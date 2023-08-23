// v-loading.js
import Vue from 'vue';
import Loading from "components/loading/Loading";

// 创建 loading 实例
function createLoading(el) {
  const loadingInstance = new Vue({
    render: (h) => h(Loading),
  });
  loadingInstance.$mount();
  el.appendChild(loadingInstance.$el);
  el.__loadingInstance__ = loadingInstance;
}

// 移除 loading 实例
function removeLoading(el) {
  if (el.__loadingInstance__) {
    el.removeChild(el.__loadingInstance__.$el);
    el.__loadingInstance__.$destroy();
    delete el.__loadingInstance__;
  }
}

Vue.directive('custom-loading', {
  bind(el, binding) {
    //获取数据
    const myData = binding.value;
    //数据不存在加载loading
    if (myData.length === 0) {
      createLoading(el);
    }
  },
  update(el, binding) {
    //获取数据
    const myData = binding.value;
    //数据存在删除loading并且只执行一次(防止页面重新渲染时多次调用)
    if (!el.__hasExecuted__ && myData.length) {
      removeLoading(el);
      el.__hasExecuted__ = true;
    }
  }
});