import request from '../utils/request';

/**
 * 文章列表查询
 * @param token
 */
export const selectListLikeApi = (articleId,token) => {
    return request({
        url: '/api/v1/pri/likearticleuser/list/'+articleId,
        method: 'post',
        headers:{
            token
        }
    });
};

/**
 * 点赞文章
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
