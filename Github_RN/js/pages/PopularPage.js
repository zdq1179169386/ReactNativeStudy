import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation'
import NavigationUtil from '../navigator/NavigationUtil'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};

export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props);
        this.tabs = ['Java', 'IOS', 'OC', 'Android', 'C', 'C++', 'C#'];
    }

    //这种方式可以加props 传入到 TopBarItem 中使用，
    // screen: props => <TopBarItem {...props} tabLabel={item}/>,

    _createTabs() {
        const tabs = {}
        this.tabs.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TopBarItem {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                }
            };
        })
        return tabs;
    }

    /*
    * tabStyle: 样式
              upperCaseLabel: 大小写,
              scrollEnabled: 是否可以滑动,
              style:{
                backgroundColor:'#678'
              },
              indicatorStyle: 滚动条样式,
              labelStyle: 标题样式,
    * */

    render() {
        const TopTabNaviagtor = createMaterialTopTabNavigator(
            this._createTabs(), {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#678'
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                }
            }
        );
        const AppTopTab = createAppContainer(TopTabNaviagtor)
        return (
            <View style={{flex: 1, marginTop: 30}}>
                <AppTopTab/>
            </View>
        );
    }
}

class TopBarItem extends Component<Props> {
    render() {
        const {tabLabel} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {tabLabel}
                </Text>
                <Button title={'点击'} onPress={
                    () => {
                        NavigationUtil.goPage('DetailPage', {...this.props})
                    }
                }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    }
});
