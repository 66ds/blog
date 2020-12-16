import request from '../utils/request';

/**
 * 所有分类查询(没有id传过来就是所有分类)
 * @param token
 */
export const sortsListInfo = (userId) => {
    return request({
        url: '/api/v1/pub/sorts/list',
        method: 'post',
        params:{
            userId
        }
    });
};

/**
 * 根据分类查询所有文章
 */
export const selectlistBySortId = (id,query) =>{
    return request({
        url: '/api/v1/pub/sorts/list/'+id,
        method:'post',
        data:query
    })
}

