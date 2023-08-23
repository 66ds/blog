import request from '../utils/request';

/**
 * 获取所有歌曲
 * @param token
 */
export const getMusicList = (query) => {
    return request({
        url: '/api/front/music/getMusicList',
        method: 'post',
        data:query
    });
};

/**
 * 获取歌曲编辑
 * @param
 */
 export const getBeForeSong = () => {
    return request({
        url: '/api/front/music/updateMusicInfo',
        method: 'get'
    });
};

/**
 * 获取所有歌曲
 * @param
 */
 export const getMusicAll = () => {
    return request({
        url: '/api/front/music/getMusicAll',
        method: 'get'
    });
};


/**
 *   //列表点击播放音乐
 * @param
 */
 export const clickMusicPlay = (musicId) => {
    return request({
        url: '/api/front/music/clickMusic',
        method: 'post',
        data:'musicId='+musicId
    });
};

/**
 *  收藏音乐
 * @param
 */
 export const collectMusic = (musicId) => {
    return request({
        url: '/api/front/music/collectMusic',
        method: 'post',
        data:'musicId='+musicId
    });
};