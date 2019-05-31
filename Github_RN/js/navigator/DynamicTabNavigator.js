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
import {BottomTabBar} from "react-navigation-tabs";
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus'
import EventTypes from '../util/EventTypes'

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

/*这是之前的做法
* render() {
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
    }*/


class TabBarComponent extends React.Component {

    render() {
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.props.theme.themeColor}
                // onTabPress={(index)=>{
                //     alert(index)
                // }}
            />
        )
    }
}

//修改 tabBarLabel
// PopularPage.navigationOptions.tabBarLabel = '最新';

 class DynamicTabNavigator extends Component<Props> {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
    }
    _createTabNavigator() {
        //防止每次都重新渲染组件
        if (this.tab){
            return this.tab;
        } else {
            const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
            const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
            const Tab = createBottomTabNavigator(
                tabs, {
                    tabBarComponent: props => (
                        <TabBarComponent theme={this.props.theme} {...props}/>
                    ),
                }
            );
            this.tab = createAppContainer(Tab);
            return this.tab;
        }
    }
    render() {
        const MainTab = this._createTabNavigator();
        return (
            <MainTab
                onNavigationStateChange={(preState,nextState,action)=>{
                    EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select,{
                        from : preState.index,
                        to : nextState.index
                    })

                }}
            />
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);


