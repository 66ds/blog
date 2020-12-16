import request from '../utils/request';

/**
 * 所有标签查询
 * @param token
 * @param userId
 */
export const labelsListApi = (userId) => {
    return request({
        url: '/api/v1/pub/labels/list',
        method: 'post',
        params:{
            userId
        }
    });
};

