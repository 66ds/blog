import request from '../utils/request';

/**
 * 文章列表查询
 * @param token
 */
export const articlesListApi = (query) => {
    return request({
        url: '/api/front/articles/getArticlesList',
        method: 'post',
        data:query
    });
};



/**
 * 单篇文章查询
 */
export const articlesInfoApi=(id)=>{
    return request({
        url:"/api/front/articles/getDetailInfo/"+id,
        method:"get"
    })
}

/**
 * 查询所有文章的时间信息
 */
export const articlesTimeListApi = ()=>{
    return request({
        url:"/api/front/articles/getTimeList",
        method:"get"
    })
}

/**
 * 查询时间对应的文章
 * @param time
 * @param query
 */
export const articleListByTimeApi = (time,query)=>{
    return request({
        url:"/api/front/articles/list/"+time,
        method:"post",
        data:query
    })
}

/**
 * 查询10条最火文章(没有id传过来就是所有文章)
 */
export const selectHotListApi = (userId)=>{
    return request({
        url:"/api/front/articles/getHotList",
        method:"get",
        params:{
            userId
        }
    })
}

/**
 * 查询10条最新文章(没有id传过来就是所有文章)
 */
 export const selectNewListApi = (userId)=>{
    return request({
        url:"/api/front/articles/getNewList",
        method:"get",
        params:{
            userId
        }
    })
}
