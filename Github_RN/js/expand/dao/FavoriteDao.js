import {AsyncStorage}from 'react-native'

const  Favorite_Key_Prefix = 'favorite_'
export  default class  FavoriteDao {
    constructor(flag){
        this.favoriteKey = Favorite_Key_Prefix + flag;
    }

    //收藏项目
    saveFavoriteItem(key,value,callback) {
        AsyncStorage.setItem(key,value,(error,result)=>{
            if (!error){
                this.updateFavoriteKeys(key,true);
            }
        })
    }

    //更新 favoriteKey
    updateFavoriteKeys(key, isAdd){
        AsyncStorage.getItem(this.favoriteKey, (error,result) => {
            if (!error){
                let favoriteKeys = [];
                if (result){
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd){
                    //如果是添加且数组中不存在key
                    if (index === -1) favoriteKeys.push(key);
                } else{
                //    如果是删除且key存在则将其从数组中删除
                    if (index !== -1) favoriteKeys.splice(index,1);
                }
                AsyncStorage.setItem(this.favoriteKey,JSON.stringify(favoriteKeys));
            }
        })
    }

    //获取收藏的key
    getFavoriteKeys() {
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(this.favoriteKey,(error,result) => {
                if (!error){
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(error);
                }
            })
        })
    }
    //取消收藏
    removeFavoriteItem(key) {
        AsyncStorage.removeItem(key,(error,result) => {
            if (!error){
                this.updateFavoriteKeys(key,false);
            }
        })
    }

    //获取所有收藏的项目
    getAllItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys().then(keys => {
                let items = [];
                if (keys){
                    AsyncStorage.multiGet(keys,(error,stores) => {
                        try {
                            stores.map((result,i,store) => {
                                let key = store[i][0];
                                let value = store[i][1];
                                if (value) items.push(JSON.parse(value));
                            })
                            resolve(items);
                        } catch (e) {
                            reject(e);
                        }
                    })
                }else {
                    resolve(items)
                }
            }).catch(e => {
                reject(e);
            })
        })
    }
}