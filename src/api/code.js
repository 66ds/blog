import request from '../utils/request';

/**
 * 获取验证码
 */
export const getValidateCode = () => {
    return request({
        url: '/api/front/code/get',
        method: 'get',
    });
};
