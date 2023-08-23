import request from '../utils/request';

/**
 * 添加留言
 * @param messageContent
 * @param parentStayId
 */
export const addStayMessageApi = (messageContent,parentStayId) => {
    return request({
        url: '/api/front/staymessage/addStayMessageInfo',
        method: 'post',
        data:{
            messageContent,
            parentStayId
        }
    });
};

/**
 * 获取所有留言列表
 * @param query
 */
export const selectStayMessageListApi = (query) =>{
    return request({
        url: '/api/front/staymessage/getStayMessageList',
        method:'post',
        data:query
    })
}
