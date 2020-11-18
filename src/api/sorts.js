import request from '../utils/request';

/**
 * 所有分类查询
 * @param token
 */
export const sortsListInfo = () => {
    return request({
        url: '/api/v1/pub/sorts/list',
        method: 'post'
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

