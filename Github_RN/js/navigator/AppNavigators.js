import React, {Component} from 'react';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from "react-navigation";

import HomePage from '../pages/HomePage'
import WelcomPage from '../pages/WelcomPage'
import DetailPage from '../pages/DetailPage'

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
    DetailPage:{
        screen:DetailPage,
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

export default createAppContainer(AppSwitchBar);
