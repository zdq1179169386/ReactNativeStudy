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
                    <MaterialIcons name={'menu'} size={24} style={{color: tintColor}}/>
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


export const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: AppDrawerNavigator,
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
        screen: Page5,
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

export const AppStackNavigator = createStackNavigator({
        TabBar: {
            screen: AppTabNavigator,
            navigationOptions:(props)=> {
                const  {navigation} = props;
                return {
                    // title:'home',
                    headerLeft:(
                        <Button title={'左滑'} onPress={
                            ()=>{
                                // navigation.toggleDrawer();
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
    }
)









