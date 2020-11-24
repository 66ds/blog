import request from '../utils/request';

/**
 * 用户登录
 */
export const userLoginApi=(userTelephoneNumber,userPassword)=>{
    return request({
        url:"/api/v1/pub/user/login",
        method:'post',
        data:{
            userTelephoneNumber,userPassword
        }
    })
}


/**
 * 获取用户的个人信息(登录)
 * @param token
 */
export const userInfoByIdApi=(token)=>{
    return request({
        url:"/api/v1/pri/user/info",
        method:'post',
        headers:{
            token
        }
    })
}
