import request from '../utils/request';

/**
 * 添加用户的关注信息
 * @param attentionId 关注的用户id
 * @returns {AxiosPromise}
 */
export const saveAttentionInfoApi = (attentionId) => {
    return request({
        url: '/api/v1/pri/userattention/save/'+attentionId,
        method: 'post',
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

/**
 * 获取谁关注我信息
 */
export const getWhoAttentionMeInfoApi = () => {
    return request({
        url: '/api/v1/pri/userattention/get/who/attention',
        method:'post'
    })
}

/**
 * 清空信息(单个和多个)
 * @param commentIds
 */
export const deleteWhoAttentionMeInfoApi = (attentionIds) => {
    return request({
        url: '/api/v1/pri/userattention/delete/who/attention',
        method:'post',
        data: attentionIds
    })
}

