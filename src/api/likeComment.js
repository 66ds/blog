import request from '../utils/request';

/**
 * 获取用户对某篇文章的所有评论
 * @param commentId
 */
export const selectCommentListLikeApi = (articleId) => {
    return request({
        url: '/api/front/likecommentuser/getCommentList/'+articleId,
        method: 'post'
    });
};

/**
 * 用户点赞评论
 * @param commentId
 */
export const likeCommentApi = (commentId) => {
    return request({
        url: '/api/front/likecommentuser/digComment/'+commentId,
        method: 'post'
    });
};
