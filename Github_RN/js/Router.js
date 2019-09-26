import React, {Component} from 'react';
import {
    Scene,
    Router,
    Lightbox, Actions
} from 'react-native-router-flux';

import {StyleSheet, StatusBar} from 'react-native';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import PopularPage from './pages/PopularPage';
import TrendingPage from './pages/TrendingPage';
import TabIcon from './common/TabIcon'
import FavoritePage from "./pages/FavoritePage";
import MyPage from "./pages/MyPage";
import CutomThemePage from "./pages/CutomThemePage";
import DetailPage from "./pages/DetailPage";
import CustomLanguagePage from './pages/CustomLanguagePage';
import RootPage from './pages/RootPage';
import Ii8n from './util/i18n';
import EventBus from "react-native-event-bus";
import EventTypes from "./util/EventTypes";

var selectedIndex = 0


const getRouter = () => {
    return (
        <Router getSceneStyle={() => {
            return styles.getSceneStyle;
        }}>
            <Lightbox>
                <Scene key='main'>
                    <Scene key='WelcomePage' component={WelcomePage} hideNavBar hideTabBar initial></Scene>
                </Scene>
                <Scene key='login'>
                    <Scene key='LoginPage' component={LoginPage} hideTabBar></Scene>
                    <Scene key='LoginSuccessPage' component={LoginSuccessPage} hideTabBar></Scene>
                </Scene>
                <Scene key={'RootPage'} component={RootPage} initial hideNavBar hideTabBar/>
                <Scene key={'root'}
                >
                    <Scene
                        key='MainTabPage'
                        tabs={true}
                        lazy={true}
                        wrap={false}
                        showLabel={false}
                        tabBarPosition={'bottom'}
                        hideNavBar={true}
                        title=''
                        tabBarStyle={{
                            height: 49,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ececec',
                        }}>
                        <Scene key='PopularPage' component={PopularPage} hideNavBar={true} title={'tabHot'}
                               icon={TabIcon}
                               tabIconName={'home'}
                               tabBarOnPress={() => {
                                   Actions.PopularPage()
                                   EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                       from: selectedIndex,
                                       to: 0
                                   })
                                   selectedIndex = 0
                               }}
                        />
                        <Scene key='TrendingPage' component={TrendingPage} hideNavBar={true} title={'tabTrending'}
                               icon={TabIcon} tabIconName={'activity'}
                               tabBarOnPress={() => {
                                   Actions.TrendingPage()
                                   EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                       from: selectedIndex,
                                       to: 1
                                   })
                                   selectedIndex = 1
                               }}
                        />
                        <Scene key='FavoritePage' component={FavoritePage} hideNavBar={true} title={'tabFavorite'}
                               icon={TabIcon} tabIconName={'heart'}
                               tabBarOnPress={() => {
                                   Actions.FavoritePage()
                                   EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                       from: selectedIndex,
                                       to: 2
                                   })
                                   selectedIndex = 2
                               }}
                        />
                        <Scene key='MyPage' component={MyPage} hideNavBar={true} icon={TabIcon} title={'tabMy'}
                               tabIconName={'user'}
                               tabBarOnPress={() => {
                                   Actions.MyPage()
                                   EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
                                       from: selectedIndex,
                                       to: 3
                                   })
                                   selectedIndex = 3
                               }}
                        />
                    </Scene>
                    <Scene key='CutomThemePage' component={CutomThemePage} hideNavBar={true}/>
                    <Scene key='DetailPage' component={DetailPage} hideNavBar={true}/>
                    <Scene key='CustomLanguagePage' component={CustomLanguagePage} hideNavBar={true}></Scene>
                </Scene>
            </Lightbox>
        </Router>
    )
}

export default getRouter;

const styles = StyleSheet.create({
    getSceneStyle: {
        flex: 1,
        backgroundColor: '#ececec',
    },
});
