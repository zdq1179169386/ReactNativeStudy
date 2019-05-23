import React, {Component} from 'react';
import {Button, Platform, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import  NavigationBar from  '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import isIphoneX from '../util/ScreenUtil'


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});


const THEME_COLOR = '#678'


export default class MyPage extends Component<Props> {
    _getLeftBtn(callBack) {
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
    _getRightBtn() {
        return <View>
            <TouchableOpacity onPress={()=>{

            }}>
                <View style={{padding:5,marginRight:8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle:'light-content',
        }
        let navigationBar = <NavigationBar title={'我的'} style={{backgroundColor: THEME_COLOR}} statusBar={statusBar} leftBtn={this._getLeftBtn()} rightBtn={this._getRightBtn()}/>
        return (
            <View style={styles.container}>
                {navigationBar}
                <Button title={'Fetch 使用'} onPress={
                    () => {
                        NavigationUtil.goPage('FetchDemoPage', {...this.props})
                    }
                }
                />
                <Button title={'AsyncStorage 使用'} onPress={
                    () => {
                        NavigationUtil.goPage('AsyncStoragePage', {...this.props})
                    }
                }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: isIphoneX ? 30 : 0,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
