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
