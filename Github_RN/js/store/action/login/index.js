import Types from '../types'
import {Buffer} from "buffer";
import {AsyncStorage} from "react-native";
import * as Constant  from '../../../res/Constant'
import HttpReuqest from '../../../network'
import Adress from "../../../network/address";
import UserAction from '../user'
import actions from "../index";


//登录
// export async function doLogin(userName,password, callback) {
//     return dispatch => {
//         let base64Str = Buffer(userName + ':' + password).toString('base64');
//         AsyncStorage.setItem(Constant.USER_NAME_KEY, userName);
//         AsyncStorage.setItem(Constant.USER_BASIC_CODE, base64Str);
//         let  requestParams = {
//             scopes: ['user', 'repo', 'gist', 'notifications'],
//             note: "admin_script",
//             client_id: Constant.CLIENT_ID,
//             client_secret: Constant.CLIENT_SECRET
//         }
//         HttpReuqest.clearAuthorization();
//         let  res = await HttpReuqest.netFetch(Adress.getAuthorization(),'POST',requestParams,true);
//         if (res && res.result) {
//             AsyncStorage.setItem(Constant.PASSWORD_KEY,password);
//             dispatch({
//                 type: Types.LOGIN_IN,
//                 res
//             })
//         }
//         setTimeout(()=>{
//             callback && callback(res.result)
//         },500)
//     }
// }
//


//异步就要返回dispatch
/**
* 登录
* */
export function doLogin(userName,password, callback) {
    return dispatch => {
        let base64Str = Buffer(userName + ':' + password).toString('base64');
        AsyncStorage.setItem(Constant.USER_NAME_KEY, userName);
        AsyncStorage.setItem(Constant.USER_BASIC_CODE, base64Str);
        let  requestParams = {
            scopes: ['user', 'repo', 'gist', 'notifications'],
            note: "admin_script",
            client_id: Constant.CLIENT_ID,
            client_secret: Constant.CLIENT_SECRET
        }
        HttpReuqest.clearAuthorization();
        HttpReuqest.netFetch(Adress.getAuthorization(),'POST',requestParams,true).then(res => {
            if (res && res.result){
                AsyncStorage.setItem(Constant.PASSWORD_KEY,password);
                //登录成功后获取下用户信息
                dispatch(actions.getUserInfo())
                dispatch({
                    type: Types.LOGIN_IN,
                    res
                })
            }
            setTimeout(()=>{
                callback && callback(res.result)
            },500)
        })
    }
}

/**
 * 登出
 * */
export function loginOut(callback) {
    return dispatch => {
        HttpReuqest.clearAuthorization();
        AsyncStorage.removeItem(Constant.USER_BASIC_CODE);
        dispatch(actions.clearUserInfo())
        dispatch({
            type: Types.LOGIN_OUT,
        })
        setTimeout(()=>{
            callback && callback()
        },1000)
    }
}

