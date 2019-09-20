import React, {Component} from 'react';
import {
    Scene,
    Router,
    Lightbox, Drawer
} from 'react-native-router-flux';

import {StyleSheet} from 'react-native';
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
                <Scene key={'root'}>
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
                        <Scene key='PopularPage' component={PopularPage} hideNavBar={true} title='home' icon={TabIcon} tabIconName={'home'}/>
                        <Scene key='TrendingPage' component={TrendingPage} hideNavBar={true} title='trending' icon={TabIcon} tabIconName={'activity'}/>
                        <Scene key='FavoritePage' component={FavoritePage} hideNavBar={true} title='favorite' icon={TabIcon} tabIconName={'heart'}/>
                        <Scene key='MyPage' component={MyPage} hideNavBar={true} icon={TabIcon} title='my' tabIconName={'user'}/>
                    </Scene>
                    <Scene key='CutomThemePage' component={CutomThemePage} hideNavBar={true}/>
                    <Scene key='DetailPage' component={DetailPage} hideNavBar={true}/>
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
