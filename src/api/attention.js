import request from '../utils/request';

/**
 * 添加用户的关注信息
 * @param attentionId 关注的用户id
 * @returns {AxiosPromise}
 */
export const saveAttentionInfoApi = (attentionId) => {
    return request({
        url: '/api/v1/pri/userattention/save',
        method: 'post',
        data:{
            attentionId
        }
    });
};

/**
 * 查看用户是不是关注了某人
 * @param attentionId
 * @returns {AxiosPromise}
 */
export const selectAttentionInfoApi = (attentionId) => {
    return request({
        url: '/api/v1/pri/userattention/info',
        method: 'post',
        data:{
            attentionId
        }
    });
};


