import {TouchableOpacity, View, StyleSheet, Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, {Component} from 'react';


export default class ViewUtil {
    //获取返回按钮
    static getLeftBackBtn(callBack) {
        return <View>
            <TouchableOpacity onPress={callBack}>
                <View style={{padding: 8, paddingLeft: 15,width: 40}}>
                    <Ionicons
                        name={'ios-arrow-back'}
                        size={26}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>

    }

    //分享按钮
    static getShareBtn(callBack) {
        return <View>
            <TouchableOpacity onPress={callBack} underlayColor={'transparent'}>
                <Ionicons name={'md-share'} size={20} style={{opacity: 0.9, marginRight: 10, color: 'white'}}/>
            </TouchableOpacity>
        </View>
    }

//    下划线
    static getLine() {
        return <View style={{
            height: 0.5,
            // opacity:0.8,
            backgroundColor: 'lightgray'
        }}>
        </View>
    }

//设置页面的item
    static getSettingItem(callBack, text, color, Icons, icon, expandableIcon) {
        return (<TouchableOpacity onPress={callBack}>
            <View style={styles.item_container}>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    {Icons && icon ?
                        <Icons name={icon} size={16} style={{color: color, marginRight: 10}}/> :
                        <View style={{opacity: 1, width: 16, height: 16, marginRight:10}}></View>
                    }
                    <Text style={{fontSize: 16}}>{text}</Text>
                </View>
                <Ionicons
                    name={expandableIcon ? expandableIcon : 'ios-arrow-forward'}
                    size={16}
                    style={{color: color || 'black'}}
                />
            </View>
        </TouchableOpacity>)
    }

    static getMenuItem(callback, menu, color, expandableIcon) {
        return ViewUtil.getSettingItem(callback, menu.name, color, menu.Icons, menu.icon, expandableIcon);
    }
}

const styles = StyleSheet.create({
    item_container: {
        backgroundColor: 'white',
        padding: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})
