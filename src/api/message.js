import request from '../utils/request';

/**
 * 获取登陆者用户的所有私信
 */
export const selectMessageListApi = () => {
    return request({
        url:'/api/v1/pri/secretmessage/users',
        method:'post',
    })
}

/**
 * 添加私信
 * @param query
 * @param token
 */
export const saveSecretMessageApi = (query) => {
    return request({
        url: '/api/v1/pri/secretmessage/save',
        method:'post',
        data:query,
    })
}

/**
 * 获取私信内容
 * @param sendId
 * @param token
 */
export const selectMessagesListApi = (sendId) => {
    return request({
        url:'/api/v1/pri/secretmessage/messages?sendId='+sendId,
        method:'post',
    })
}
