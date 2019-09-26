import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {TOKEN_KEY,FirstShow_KEY} from "../res/Constant";

type Props = {};
export default class WelcomePage extends Component<Props> {
    constructor(props) {
      super(props)
        //判断是否是第一次加载，显示欢迎页
        AsyncStorage.getItem(FirstShow_KEY).then(value => {
            console.log('value = '+ value)
            if (!value){
                //显示欢迎页
                Actions.reset('main')
            } else {
                //再判断是否登录，没有跳转登录页，已经登录跳转主页
                AsyncStorage.getItem(TOKEN_KEY).then(value => {
                    console.log('token ='+ value)
                    if (value){
                        //已经登录过了
                        Actions.reset('root')
                    } else {
                        //未登录
                        Actions.reset('login')
                    }
                }).catch(error=>{
                    error && console.log(error.toString());
                })
            }
        }).catch(error=>{
            error && console.log(error.toString());
        })
    }
    render() {
        return (
          <View/>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {}
});
