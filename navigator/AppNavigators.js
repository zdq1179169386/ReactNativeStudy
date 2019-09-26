import React, {Component} from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from "react-navigation";

import HomePage from '../pages/HomePage'
import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import {connect} from "react-redux";
import {
    createReactNavigationReduxMiddleware,
    reduxifyNavigator,
    createReduxContainer
} from 'react-navigation-redux-helpers'
import FetchDemoPage from '../pages/FetchDemoPage'
import AsyncStoragePage from  '../pages/AsyncStoragePage'
import WebViewPage from '../pages/WebViewPage'
import CutomThemePage from '../pages/CutomThemePage'

//跟路由
export const rootCom = 'Welcom';

//欢迎页的导航栈
const WelcomStack = createStackNavigator({
    WelcomPage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null,
        }
    }
})
//主tabbar 的导航栈
const MainStack = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null
        }
    },
    FetchDemoPage:{
        screen:FetchDemoPage,
        navigationOptions:{
            title:'Fetch 使用'
        }
    },
    AsyncStoragePage:{
        screen:AsyncStoragePage,
        navigationOptions:{
            title:'AsyncStorage 使用'
        }
    },
    WebViewPage:{
        screen:WebViewPage,
        navigationOptions:{
            header: null,
        }
    },
    CutomThemePage:{
        screen: CutomThemePage,
        navigationOptions:{
            header:null,
        }
    }
})

const AppSwitchBar = createSwitchNavigator({
    Welcom: WelcomStack,
    Main: MainStack,

}, {
    initialRouteName: 'Welcom',
    navigationOptions: {
        header: null,
    }
})

export const RootNavigator = createAppContainer(AppSwitchBar);

export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root',
);

//reduxifyNavigator is deprecated in react-navigation-redux-helpers@3.0.0! Please use createReduxContainer instead.

// const AppWithNavigationState = reduxifyNavigator(RootNavigator,'root');

const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

// state 到 props 的映射
const mapStateToProps = state => ({
    state: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState);
