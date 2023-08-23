import Vue from 'vue';
Vue.directive('leftClick', {
    inserted: function (el, binding) {
        el = el.getElementsByClassName('el-button')[0]
        const vm = binding.value;
        el.addEventListener('click', () => {
            vm.searchLoading = ""
            vm.btnLoading = true
            setTimeout(() => {
                vm.btnLoading = false
                vm.searchLoading = ""
            }, 1000)

        })
    }
})