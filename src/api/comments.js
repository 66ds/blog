import request from '../utils/request';

/**
 * 添加评论
 * @param token
 */
export const addCommentApi = (commentContent,articleId,parentCommentId,token) => {
    return request({
        url: '/api/v1/pri/comments/save',
        method: 'post',
        headers:{
            token
        },
        data:{
            commentContent,
            articleId,
            parentCommentId
        }
    });
};

