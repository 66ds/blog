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
 * 文件上传
 */
export const fileUploadApi=(file,token)=>{
    return request({
        url:"/api/v1/pri/oos/upload",
        method:"post",
        data:file,
        headers: { 'Content-Type': 'multipart/form-data',token}
    })
}

/**
 * 文章添加
 */
export const articlesAddApi=(articleForm,token)=>{
    return request({
        url:"/api/v1/pri/articles/add",
        method:"post",
        data:articleForm,
        headers: {token}
    })
}

/**
 * 单偏文章查询
 */
export const articlesInfoApi=(id)=>{
    return request({
        url:"/api/v1/pub/articles/info/"+id,
        method:"get"
    })
}

