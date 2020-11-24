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

/**
 * 获取文章对应的所有评论列表
 * @param articleId
 * @param query
 */
export const selectCommentListApi = (articleId,query) =>{
    return request({
        url: '/api/v1/pub/comments/list/'+articleId,
        method:'post',
        data:query
    })
}


/**
 * 根据父commentId获取用户信息
 */
export const selectUserInfoApi = (parentCommentId) =>{
    return request({
        url: '/api/v1/pub/comments/users/'+parentCommentId,
        method:'get'
    })
}
