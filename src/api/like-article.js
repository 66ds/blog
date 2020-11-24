import request from '../utils/request';

/**
 * 查看用户是否点赞了文章
 * @param token
 */
export const selectArticleListLikeApi = (articleId,token) => {
    return request({
        url: '/api/v1/pri/likearticleuser/list/'+articleId,
        method: 'post',
        headers:{
            token
        }
    });
};

/**
 * 用户点赞文章
 * @param articleId
 * @param token
 */
export const likeArticleApi = (articleId,token) => {
    return request({
        url: '/api/v1/pri/likearticleuser/like/'+articleId,
        method: 'post',
        headers:{
            token
        }
    });
};
