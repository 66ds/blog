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
 */
export const userInfoByIdApi=()=>{
    return request({
        url:"/api/v1/pri/user/info",
        method:'post'
    })
}

/**
 * 获取某用户的名片信息
 * @param userId
 */
export const userCardInfoById=(userId)=>{
    return request({
        url:"/api/v1/pub/users/card/"+userId,
        method:'post',
    })
}


/**
 * 修改用户的个人信息(已登录)
 * @param user
 */
export const updateUserInfoByIdApi = (user)=>{
    return request({
        url:"/api/v1/pri/users/update",
        method:"post",
        data:user
    })
}
