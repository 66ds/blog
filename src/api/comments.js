import request from '../utils/request';

/**
 * 添加评论
 * @param commentContent
 * @param articleId
 * @param parentCommentId
 */
export const addCommentApi = (commentContent,articleId,parentCommentId) => {
    return request({
        url: '/api/front/comments/addComment',
        method: 'post',
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
        url: '/api/front/comments/getCommentsList/'+articleId,
        method:'post',
        data:query
    })
}

/**
 * 获取未读评论信息
 */
export const getNoReadCommentInfoApi = () => {
    return request({
        url: '/api/front/comments/getNoReadInfo',
        method:'post'
    })
}

/**
 * 清空信息(单个和多个)
 * @param commentIds
 */
export const deleteNoReadCommentInfoApi = (commentIds) => {
    return request({
        url: '/api/front/comments/deleteNoReadInfo',
        method:'post',
        data: commentIds
    })
}
