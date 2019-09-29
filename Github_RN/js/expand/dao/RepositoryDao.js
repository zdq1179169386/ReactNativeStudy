import {AsyncStorage}from 'react-native'
import * as Constant from '../../res/Constant'
import HtttRequest from '../../network'
import Address from '../../network/address'


/**
 * 获取用户的仓库
 * */
export async function getUserRepositoryDao(username,page,sort) {
    //page = 1，先判断本地有没有缓存，有缓存返回缓存，没有请求新数据，请求完新数据，返回新数据并返回
    //page != 1. 直接请求新数据，返回
    let url = Address.userRepos(username,sort) + Address.getPageParams('&',page);
    let res = await HtttRequest.netFetch(url);
    // if (res && res.result && res.data.lenght > 0) {
    //
    // }
    return {
        data: res.data,
        result: res.result
    }
}

