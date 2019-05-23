import {TouchableOpacity, View} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, {Component} from 'react';


export default  class  ViewUtil {
    //获取返回按钮
    static getLeftBackBtn(callBack) {
        return <View style={{padding:8,paddingLeft: 15}}>
            <TouchableOpacity onPress={callBack} >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color: 'white'}}
                />
            </TouchableOpacity>
        </View>

    }
    //分享按钮

    static  getShareBtn(callBack) {
        return <View>
            <TouchableOpacity onPress={callBack} underlayColor={'transparent'}>
                <Ionicons name={'md-share'} size={20} style={{opacity:0.9, marginRight: 10,color:'white'}}/>
            </TouchableOpacity>
        </View>
    }

}