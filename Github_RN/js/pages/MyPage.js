import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import isIphoneX from '../util/ScreenUtil'
import More_Menu from '../common/More_Menu'
import ViewUtil from '../util/ViewUtil'
import {connect} from 'react-redux'
import actions from '../action/index'
import {ThemeFactory} from "../res/ThemeFactory";
import {Actions} from "react-native-router-flux";

  class MyPage extends Component<Props> {
    _getLeftBtn(callBack) {
        return <View style={{padding: 8, paddingLeft: 15}}>
            <TouchableOpacity onPress={callBack}>
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color: 'white'}}
                />
            </TouchableOpacity>
        </View>
    }

    _getRightBtn() {
        return <View>
            <TouchableOpacity onPress={() => {
            }}>
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    onClick(menu) {
        const {theme} = this.props;
        let routeName, params = {};
        switch (menu) {
            case More_Menu.Tutorial:
                routeName='WebViewPage';
                params.title='教程';
                params.url='http://www.baidu.com';
                params.theme = theme
                break
            case More_Menu.Custom_Theme:
                routeName='CutomThemePage';
                params.title='主题';
                params.theme = theme
                break
        }
        if (routeName){
            // NavigationUtil.goPage(routeName,params);
            Actions.push('CutomThemePage',params);
        }
    }

    getItem(menu) {
        const {theme} = this.props;
        return ViewUtil.getMenuItem(()=>this.onClick(menu),menu,theme.themeColor)
    }

    render() {
        const {theme} = this.props;

        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={'我的'} style={theme.styles.navBar} statusBar={statusBar}
                                            rightBtn={this._getRightBtn()}/>
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.about}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <Ionicons name={More_Menu.About.icon} size={40}
                                              style={{marginRight: 10, color: theme.themeColor}}/>
                                    <Text>ZDQ</Text>
                                </View>
                                <Ionicons name={'ios-arrow-forward'} size={16}
                                          style={{marginRight: 10, color: theme.themeColor}}/>
                            </View>
                        </TouchableOpacity>
                        {ViewUtil.getLine()}
                        {this.getItem(More_Menu.Tutorial)}
                        {/*趋势管理*/}
                        <Text style={styles.groupTitle}>趋势管理</Text>
                        {this.getItem(More_Menu.Custom_Language)}
                        {ViewUtil.getLine()}
                        {this.getItem(More_Menu.Sort_Language)}

                        <Text style={styles.groupTitle}>最热模块</Text>
                        {this.getItem(More_Menu.Custom_Key)}
                        {this.getItem(More_Menu.Sort_Key)}
                        {ViewUtil.getLine()}
                        {this.getItem(More_Menu.Remove_Key)}

                        <Text style={styles.groupTitle}>设置</Text>
                        {this.getItem(More_Menu.Custom_Theme)}
                        {ViewUtil.getLine()}
                        {this.getItem(More_Menu.About_Author)}
                        {ViewUtil.getLine()}
                        {this.getItem(More_Menu.Feedback)}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
})

export default connect(mapStateToProps,)(MyPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    about: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 10,
        height: 90,
    },
    groupTitle:{
        marginLeft:10,
        marginTop: 10,
        marginBottom:5,
        fontSize:12,
        color:'gray'
    }
});
