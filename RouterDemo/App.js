/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Scene, Router, Lightbox, Modal, Tabs, Stack} from 'react-native-router-flux';
import LoginPage from './LoginPage';
import WelcomePage from './WelcomePage';
import HomePage from './HomePage';
import MyPage from './MyPage';


export default class App extends Component<Props> {
    render() {
        return (
            <Router getSceneStyle={() => {
                return styles.getSceneStyle;
            }}>
                <Lightbox>
                    <Scene key='main'>
                        <Scene key='WelcomePage' component={WelcomePage} hideNavBar hideTabBar></Scene>
                    </Scene>
                    <Scene key='LoginPage' component={LoginPage} hideTabBar></Scene>
                    <Scene
                        key='MainTabPage'
                        tabs={true}
                        lazy={true}
                        wrap={false}
                        showLabel={false}
                        tabBarPosition={'bottom'}
                        title=''
                        tabBarStyle={{
                            height: 49,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#ececec',
                        }}>
                        <Scene key='HomePage' component={HomePage} title='home'></Scene>
                        <Scene key='MyPage' component={MyPage} title='My'></Scene>
                    </Scene>
                </Lightbox>
            </Router>
        );
    }
};

const styles = StyleSheet.create({
    getSceneStyle: {
        flex: 1,
        backgroundColor: '#ececec',
    },
});


