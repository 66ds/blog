import request from '../utils/request';

/**
 * 文章列表查询
 * @param token
 */
export const articlesListApi = (query) => {
    return request({
        url: '/api/v1/pub/articles/list',
        method: 'post',
        data:query
    });
};


/**
 * 单偏文章查询
 */
export const articlesInfoApi=(id)=>{
    return request({
        url:"/api/v1/pub/articles/info/"+id,
        method:"get"
    })
}

/**
 * 查询所有文章的时间信息
 */
export const articlesTimeListApi = ()=>{
    return request({
        url:"/api/v1/pub/articles/timeList",
        method:"get"
    })
}

/*8
查询时间对应的文字
 */
export const articleListByTimeApi = (time,query)=>{
    return request({
        url:"/api/v1/pub/articles/list/"+time,
        method:"post",
        data:query
    })
}

