import request from '../utils/request';

/**
 * 获取用户对某篇文章的所有评论
 * @param commentId
 * @param token
 */
export const selectCommentListLikeApi = (articleId,token) => {
    return request({
        url: '/api/v1/pri/likecommentuser/list/'+articleId,
        method: 'post',
        headers:{
            token
        }
    });
};

/**
 * 用户点赞评论
 * @param commentId
 * @param token
 */
export const likeCommentApi = (commentId,token) => {
    return request({
        url: '/api/v1/pri/likecommentuser/like/'+commentId,
        method: 'post',
        headers:{
            token
        }
    });
};
