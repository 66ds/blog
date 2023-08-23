import request from '../utils/request';

/**
 * 查看用户是否点赞了文章
 * @param articleId
 */
export const selectArticleListLikeApi = (articleId) => {
    return request({
        url: '/api/front/likearticleuser/getWhoDigArticle/'+articleId,
        method: 'post'
    });
};

/**
 * 用户点赞文章
 * @param articleId
 */
export const likeArticleApi = (articleId) => {
    return request({
        url: '/api/front/likearticleuser/DigArticle/'+articleId,
        method: 'post'
    });
};

/**
 * 获取谁点赞我的信息
 */
export const getWhoDigMeInfoApi = () => {
    return request({
        url: '/api/front/likearticleuser/getWhoDigInfo',
        method:'post'
    })
}

/**
 * 清空信息(单个和多个)
 * @param ids
 */
export const deleteWhoDigMeInfoApi = (ids) => {
    return request({
        url: '/api/front/likearticleuser/deleteWhoDigInfo',
        method:'post',
        data: ids
    })
}
