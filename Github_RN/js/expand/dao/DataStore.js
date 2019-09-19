import {AsyncStorage} from 'react-native'
//离线缓存设计：
// 先获取本地数据，判断是否存在和是否过期，
// 过期才去获取最新数据，并存到本地

import Trending from 'GitHubTrending'

export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'}

export default class DataStore {
    //跟方法
    fetchData(url, flag) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url)
                .then(wrapData => {
                    if (wrapData && wrapData != null && wrapData != 'null') {
                        resolve(wrapData);
                    } else {
                        this.fetchNewData(url, flag)
                            .then(data => {
                                resolve(this._wrapData(data));
                            }).catch(error => {
                            reject(error)
                        })
                    }
                })
                .catch(error => {
                    this.fetchNewData(url, flag)
                        .then(data => {
                            resolve(this._wrapData(data));
                        }).catch(error => {
                        reject(error)
                    })
                })
        })
    }

    //保存数据
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);

    }

    //加时间戳
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }

    //获取本地数据
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })

    }

//    获取网络数据
    fetchNewData(url, flag) {
        return new Promise((resolve, reject) => {
            if (flag !== FLAG_STORAGE.flag_trending) {
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('fetchNewData error')
                    })
                    .then((responseData) => {
                        this.saveData(url, responseData);
                        resolve(responseData);
                    })
                    .catch(error => {
                        reject(error)
                    })
            } else {
                new Trending().fetchTrending(url).then(items=>{
                    if (!items){
                        throw  new Error('responsdata is null')
                    }
                    this.saveData(url,items)
                    resolve(items);
                }).catch(error => {
                    reject(error);
                })

            }
        })
    }

//    时间戳检查方法
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() !== targetDate.getHours()) return false;
        return true;
    }
}
