import React, {Component} from 'react';
import {Button, Platform, ScrollView, SafeAreaView} from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createDrawerNavigator,
    DrawerItems,
} from "react-navigation";
import HomePage from './HomePage';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const AppDrawerNavigator = createDrawerNavigator({
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                drawerLabel: 'Page4',
                drawerIcon: ({tintColor}) => (
                    <MaterialIcons name={'menu'} size={24} style={{color:tintColor}}/>
                )
            }
        },
    },
    {
        initialRouteName: 'HomePage',
        contentOptions: {
            activeTintColor: '#e91e63'
        },
        contentComponent: (props) => (
            <ScrollView style={{backgroundColor: '#789', flex: 1}}>
                <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props}/>
                </SafeAreaView>
            </ScrollView>
        ),

    })

var _isShow = false;

export const AppStackNavigator = createStackNavigator({
    Drawer: {
        screen: AppDrawerNavigator,
        navigationOptions: (props) => {
            const {navigation} = props;
            return {
                title: 'home',
                headerLeft: (
                    <Button title={'Drawer'} onPress={
                        () => {
                            if (_isShow){
                                navigation.closeDrawer();
                            } else {
                                navigation.openDrawer();
                            }
                            _isShow = !_isShow;
                        }
                    }/>
                )
            }
        }
    },
    Page1: {
        screen: Page1,
        navigationOptions: ({navigation}) => ({
            //动态设置 navigationOptions
            title: `${navigation.state.params.name}`
        })
    },
    Page2: {
        screen: Page2,
        navigationOptions: {
            //静态设置
            title: 'page2'
        }
    },
    Page3: {
        screen: Page3,
        navigationOptions: (props) => {
            const {navigation} = props;
            const {state, setParams} = navigation;
            const {params} = state;
            return {
                title: params.title ? params.title : 'Page3',
                headerRight: (
                    <Button title={
                        params.mode === 'edit' ? '保存' : '编辑'
                    } onPress={
                        () => {
                            setParams({
                                mode: params.mode === 'edit' ? '' : 'edit'
                            })
                        }
                    }/>
                )
            }
        }
    },

}, {
    navigationOptions: ({navigation}) => {
        return {
            // push 的时候隐藏底部tabbar
            tabBarVisible: navigation.state.index === 0,
        }
    }
})

const MyScreen = createStackNavigator({
    Page5: {
        screen: Page5,
        navigationOptions: {
            title: 'My'
        }
    }
})

export const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppStackNavigator,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Ionicons
                        name={'ios-home'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    My: {
        screen: MyScreen,
        navigationOptions: {
            tabBarLabel: 'My',
            tabBarIcon: ({tintColor, focused}) => {
                return (
                    <Ionicons
                        name={'ios-people'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
}, {
    initialRouteName: 'Home',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
        inactiveTintColor: 'gray',

    },
})







