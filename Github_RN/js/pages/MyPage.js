import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import More_Menu from '../common/More_Menu'
import ViewUtil from '../util/ViewUtil'
import {connect} from 'react-redux'
import actions from '../action/index'
import {ThemeFactory} from "../res/ThemeFactory";
import {Actions} from "react-native-router-flux";
import Ii8n from "../util/i18n";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class MyPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            menus: {
                Custom_Language:{name: Ii8n('customLanguage'),Icons: Octicons, icon:'check'},
                Custom_Theme:{name: Ii8n('customTheme'),Icons: Octicons, icon:'check'},
            }
        }
    }
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
        const {theme} = this.props;

        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={Ii8n('tabMy')} style={theme.styles.navBar} statusBar={statusBar}
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
                        <Text style={styles.groupTitle}>{Ii8n('setting')}</Text>
                        {this.getItem(this.state.menus.Custom_Language)}
                        {ViewUtil.getLine()}
                        {this.getItem(this.state.menus.Custom_Theme)}
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
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    }
});
