import axios from 'axios';
import { MessageBox } from 'element-ui';
import Vue from 'vue'

//axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");//设置请求头token

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://127.0.0.1:12000/',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.data = {
                ...config.data,
                _t: Date.parse(new Date()) / 1000
            }
        } else if (config.method == 'get') {
            config.params = {
                _t: Date.parse(new Date()) / 1000,
                ...config.params
            }
        }
        return config
    },
    error => {
        return Promise.reject("Internet Error");
    }
);
service.interceptors.response.use(
    response => {
        const res = response.data
        if (response.status === 200) {
            return res;
        } else {
            return Promise.reject("Internet Error");
        }
    },
    error => {
        return Promise.reject("Internet Error");
    }
);

export default service;
