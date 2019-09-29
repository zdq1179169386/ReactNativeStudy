import Types from '../types'
import {Buffer} from "buffer";
import {AsyncStorage} from "react-native";
import * as Constant  from '../../../res/Constant'
import HttpReuqest from '../../../network'
import Adress from "../../../network/address";
import UserDao, {getFollowedListDao, getFollowerListDao} from '../../../expand/dao/UserDao'
import {getUserRepositoryDao} from "../../../expand/dao/RepositoryDao";

/**
 * 初始化用户信息,本地的
 */
export function initUserInfo(callback) {
    return dispatch => {
         AsyncStorage.getItem(Constant.TOKEN_KEY).then(token => {
             if (token){
                 UserDao.getUserLocal().then(res=> {
                    if (res && res.result){
                        dispatch({
                            type: Types.USER_INFO,
                            res: res.data
                        })
                    }
                     callback && callback(res.data);
                 }).catch(e=>{
                    callback && callback(null)
                 })
             } else {
                 callback && callback(null)
             }
         }).catch(e => {
             callback && callback(null)
         })
    }
}

/**
 * 获取登录用户信息
 */
export  function  getUserInfo() {
    return dispatch => {
        UserDao.getUserInfoRemote().then(res => {
            if (res && res.result) {
                console.log('个人信息 = '+ res.data)
                dispatch({
                    type: Types.USER_INFO,
                    res: res.data
                })
            }
        })
    }
}
/**
 * 清除用户信息
 */
export  function  clearUserInfo() {
    return dispatch => {
        AsyncStorage.removeItem(Constant.USER_INFO).then(res=>{
            dispatch({
                type: Types.USER_INFO,
                res: null
            })
        })
    }
}

/**
 * 获取用户仓库
 */
export  function getUserRepos(username,page = 1,sort,callback) {
    return dispatch => {
        getUserRepositoryDao(username,page,sort).then(res =>{
            if (res && res.result){
                callback && callback(res.data)
            }
        })
    }
}

/**
 * 获取用户粉丝
 */
export  function getUserFollower(username,page = 1,callback) {
    return dispatch => {
        getFollowerListDao(username,page).then(res => {
            if (res && res.result){
                callback && callback(res.data)
            }
        })
    }
}
/**
 * 获取用户关注列表
 */
export function getFollowedList(username,page = 1,callback) {
    return dispatch => {
        getFollowedListDao(username,page).then(res => {
            if (res && res.result){
                callback && callback(res.data)
            }
        })
    }
}


