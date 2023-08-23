import axios from 'axios';
// import message from '@/plugins/message'
import store from '@/store/index';
import { Partten } from "@/partten";
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'http://47.100.136.75:12000/',
    baseURL: 'http://127.0.0.1:12000/',
    // timeout: Partten.timeOut
});

service.interceptors.request.use(
    config => {
        config.headers.token = store.state.token //设置请求头token
        return config
    },
    error => {
        return Promise.reject(error);
    }
);
//响应拦截器
service.interceptors.response.use(
    res => {
        const responseCode = res.data.code;
        if (responseCode === Partten.code) {
            return res.data
        } else {
            return Promise.reject(res.data === null || res.data.msg)
        }
    },
    // eslint-disable-next-line no-unused-vars
    error => {
        return Promise.reject(error.msg);
    }
);

export default service;
