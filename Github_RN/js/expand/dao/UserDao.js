import {AsyncStorage}from 'react-native'
import * as Constant from '../../res/Constant'
import HtttRequest from '../../network'
import Address from '../../network/address'


export default class UserDao {
    //获取用户本地信息
    static async getUserLocal() {
        let userText = await AsyncStorage.getItem(Constant.USER_INFO);
        if (userText){
            let res = JSON.parse(userText);
            return {
                result: true,
                data: res
            }
        } else {
            return {
                result: false,
            }
        }
    }
    //获取用户远程数据
    static async getUserInfoRemote() {
        let res = await HtttRequest.netFetch(Address.getMyUserInfo());
        if (res && res.result){
            AsyncStorage.setItem(Constant.USER_INFO,JSON.stringify(res.data));
            return {
                result: true,
                data: res.data,
            }
        } else {
            return {
                result: false,
            }
        }
    }
}

/**
 * 获取用户粉丝列表
 */
export async function getFollowerListDao(username,page) {
    let url = Address.getUserFollower(username) + Address.getPageParams("?", page);
    let res = await HtttRequest.netFetch(url);
    if (res && res.result){

    }
    return {
        data: res.data,
        result: res.result
    }
}


/**
 * 获取用户关注列表
 */
export async function getFollowedListDao(username,page) {
    let url = Address.getUserFollow(username) + Address.getPageParams("?", page);
    let res = await HtttRequest.netFetch(url);
    if (res && res.result){

    }
    return {
        data: res.data,
        result: res.result
    }
}
