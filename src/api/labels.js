import request from '../utils/request';

/**
 * 所有标签查询
 * @param token
 */
export const labelsListApi = () => {
    return request({
        url: '/api/v1/pub/labels/list',
        method: 'post'
    });
};

