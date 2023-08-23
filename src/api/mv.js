import request from '../utils/request';

/**
 * 获取所有歌曲
 * @param token
 */
export const getMvList = () => {
    return request({
        url: '/api/front/mv/getMvList',
        method: 'get'
    });
};
