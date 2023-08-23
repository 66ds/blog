import request from '../utils/request';

/**
 * 所有标签查询
 * @param token
 * @param userId
 */
export const labelsListApi = (userId) => {
    return request({
        url: '/api/front/labels/getLabelsList',
        method: 'post',
        params:{
            userId
        }
    });
};

