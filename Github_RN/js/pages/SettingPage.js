import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ViewUtil from '../util/ViewUtil'
import {connect} from 'react-redux'
import {Actions} from "react-native-router-flux";
import Ii8n from "../util/i18n";
import {Button} from 'react-native-elements'
import actions from "../store/action";

class SettingPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            menus: {
                Custom_Language:{name: Ii8n('customLanguage')},
                Custom_Theme:{name: Ii8n('customTheme')},
            },
            btnLoading: false
        }
    }
    _getBackBtn(callBack) {
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

    onClick(menu) {
        const {theme} = this.props;
        let routeName, params = {};
        switch (menu) {
            case this.state.menus.Custom_Theme:
                routeName = 'CutomThemePage';
                params.title = Ii8n('customTheme');
                params.theme = theme
                break
            case this.state.menus.Custom_Language:
                routeName = 'CustomLanguagePage';
                params.title = Ii8n('customLanguage');
                params.theme = theme
                break
        }
        if (routeName) {
            Actions.push(routeName, params);
        }
    }

    getItem(menu) {
        const {theme} = this.props;
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, theme.themeColor)
    }

    render() {
        const {theme,user} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={Ii8n('setting')} style={theme.styles.navBar} statusBar={statusBar}
                                           leftBtn={this._getBackBtn(()=>{
                                               Actions.pop()
                                           })}/>
        return (
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    <View style={{marginTop: 10}}>
                        {this.getItem(this.state.menus.Custom_Language)}
                        {ViewUtil.getLine()}
                        {this.getItem(this.state.menus.Custom_Theme)}
                        <Button buttonStyle={{marginTop: 50,
                            marginRight: 15,
                            marginLeft: 15,
                            height: 50,backgroundColor: theme.themeColor}} title={'退出登录'} onPress={()=>this.loginOut()} loading={this.state.btnLoading}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
    //退出登录
    loginOut() {
        this.setState({
            btnLoading: true
        })
        const {loginOut} = this.props;
        loginOut(()=>{
            this.setState({
                btnLoading: false
            })
            Actions.reset('login')
        })
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    loginOut: (callback) => dispatch(actions.loginOut(callback)),
    clearUserInfo: () => dispatch(actions.clearUserInfo())
})


export default connect(mapStateToProps,mapDispatchToProps)(SettingPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});
