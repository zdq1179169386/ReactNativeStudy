import {TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, {Component} from 'react';


export default  class  Util {
//    检查item是否被收藏
    static checkFavorite(item, keys = []) {
        if (!keys) return false;
        for (let i = 0, len = keys.length; i < len; i++) {
            let id = item.id ? item.id : item.fullName;
            if (id.toString() === keys[i]){
                return true;
            }
        }
        return false;
    }
}


