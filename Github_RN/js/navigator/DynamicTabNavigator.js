import React, {Component} from 'react';
import FavoritePage from '../pages/FavoritePage'
import PopularPage from '../pages/PopularPage'
import MyPage from '../pages/MyPage'
import TrendingPage from '../pages/TrendingPage'
import {
    createBottomTabNavigator,
    createAppContainer
} from "react-navigation";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'

const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'trending-down'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <AntDesign
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }
};

import {BottomTabBar} from "react-navigation-tabs";

class TabBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }
    render() {
        const {routes, index} = this.props.navigation.state;
        if (routes[index].params) {
            const {theme} = routes[index].params;
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme;
            }
        }
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.theme.tintColor || this.props.activeTintColor}
            />
        )
    }
}

//修改 tabBarLabel
// PopularPage.navigationOptions.tabBarLabel = '最新';

export default class DynamicTabNavigator extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }

    _createTabNavigator() {
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
        return createBottomTabNavigator(
            tabs, {
                tabBarComponent: TabBarComponent,
            }
        );
    }

    render() {
        const Tab = this._createTabNavigator();
        const MainTab = createAppContainer(Tab);
        return (
            <MainTab/>
        );
    }
}

