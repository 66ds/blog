import request from '../utils/request';

/**
 * 添加友链信息
 * @param linkForm
 * @returns {AxiosPromise}
 */
export const addFriendLinkApi = (linkForm) => {
    return request({
        url:'/api/front/friendlylink/addLinkInfo',
        method:'post',
        data:linkForm
    })
}

/**
 * 查询所有友情链接
 * @returns {AxiosPromise}
 */
export const selectFriendLinkListApi = () => {
    return request({
        url:'/api/front/friendlylink/getLinkList',
        method:'post'
    })
}