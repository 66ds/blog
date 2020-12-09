import request from '../utils/request';

/**
 * 获取登陆者用户的所有私信
 * @param token
 */
export const selectMessageList = (token) => {
    return request({
        url:'/api/v1/pri/secretmessage/list',
        method:'post',
        headers:{
            token
        }
    })
}
