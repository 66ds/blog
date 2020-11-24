import axios from 'axios';
import { Message } from 'element-ui';

// axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");//设置请求头token

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
    // eslint-disable-next-line no-unused-vars
    error => {
        return Promise.reject("网络错误");
    }
);
service.interceptors.response.use(
    res => {
        if (res.status === 200) {
            if(res.data.code === 10008){
                 Message.error(res.data.msg)
            }
            else if(res.data.code === 0){
                return res.data;
            }
            else {
                 Message.error(res.data.msg)
            }
        } else {
            return Promise.reject("网络错误");
        }
    },
    // eslint-disable-next-line no-unused-vars
    error => {
        return Promise.reject("网络错误");
    }
);

export default service;
