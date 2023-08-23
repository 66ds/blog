import request from '../utils/request';

/**
 * 用户登录
 * @param {*} userTelephoneNumber 用户账号(手机号)
 * @param {*} userPassword 用户密码
 * @param {*} code 验证码
 * @param {*} key 验证码(标识)
 * @returns 
 */
export const userLoginApi=(userTelephoneNumber,userPassword,code,key)=>{
    return request({
        url:"/api/front/user/login",
        method:'post',
        data:{
            userTelephoneNumber,userPassword,key,code
        }
    })
}


/**
 * 获取用户的个人信息(登录)
 */
export const userInfoByIdApi=()=>{
    return request({
        url:"/api/front/user/getUserInfo",
        method:'post'
    })
}

/**
 * 获取某用户的名片信息
 * @param userId
 */
export const userCardInfoById=(userId)=>{
    return request({
        url:"/api/front/users/getCardInfo/"+userId,
        method:'post',
    })
}


/**
 * 修改用户的个人信息(已登录)
 * @param user
 */
export const updateUserInfoByIdApi = (user)=>{
    return request({
        url:"/api/front/users/updateUserInfo",
        method:"post",
        data:user
    })
}
