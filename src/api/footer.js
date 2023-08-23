import request from '../utils/request';

/**
 * 获取运行天数，实际人数和观看总人数
 * @param 
 */
export const getNetInfo = (ip) => {
    return request({
        url: '/api/front/net/getNetInfo?ip='+ip,
        method: 'get'
    });
};


