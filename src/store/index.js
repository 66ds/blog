import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: '',
        user:null
    },
    getters: {
     
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state,data){
            state.user=data;
        }
    },
    actions: {
        setToken({ commit }, data){
            commit('setToken', data)
        },
        setUser({ commit }, data){
            commit('setUser', data)
        }
    },
    modules: {},
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
});
