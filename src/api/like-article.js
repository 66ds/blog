import request from '../utils/request';

/**
 * 查看用户是否点赞了文章
 * @param articleId
 */
export const selectArticleListLikeApi = (articleId) => {
    return request({
        url: '/api/v1/pri/likearticleuser/list/'+articleId,
        method: 'post'
    });
};

/**
 * 用户点赞文章
 * @param articleId
 */
export const likeArticleApi = (articleId) => {
    return request({
        url: '/api/v1/pri/likearticleuser/like/'+articleId,
        method: 'post'
    });
};

/**
 * 获取谁点赞我的信息
 */
export const getWhoDigMeInfoApi = () => {
    return request({
        url: '/api/v1/pri/likearticleuser/get/who/dig',
        method:'post'
    })
}

/**
 * 清空信息(单个和多个)
 * @param commentIds
 */
export const deleteWhoDigMeInfoApi = (commentIds) => {
    return request({
        url: '/api/v1/pri/comments/delete/no/read',
        method:'post',
        data: commentIds
    })
}
