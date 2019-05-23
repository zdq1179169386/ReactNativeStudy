import React, {Component} from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from "react-navigation";

import HomePage from '../pages/HomePage'
import WelcomPage from '../pages/WelcomPage'
import DetailPage from '../pages/DetailPage'
import {connect} from "react-redux";
import {
    createReactNavigationReduxMiddleware,
    reduxifyNavigator,
    createReduxContainer
} from 'react-navigation-redux-helpers'
import FetchDemoPage from '../pages/FetchDemoPage'
import AsyncStoragePage from  '../pages/AsyncStoragePage'

//跟路由
export const rootCom = 'Welcom';

const WelcomStack = createStackNavigator({
    WelcomPage: {
        screen: WelcomPage,
        navigationOptions: {
            header: null,
        }
    }
})

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


const mapStateToProps = state => ({
    state: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState);
