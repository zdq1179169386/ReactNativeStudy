import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import More_Menu from '../common/More_Menu'
import ViewUtil from '../util/ViewUtil'
import {connect} from 'react-redux'
import actions from '../store/action/index'
import {ThemeFactory} from "../res/ThemeFactory";
import {Actions} from "react-native-router-flux";
import Ii8n from "../util/i18n";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class MyPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.public_repos = Ii8n('public_repos');
        this.followers = Ii8n('followers');
        this.following = Ii8n('following');
        this.state = {
            menus: {
                public_repos: {name: '仓库', Icons: Octicons, icon: 'repo'},
                followers: {name: '粉丝', Icons: Octicons, icon: 'repo'},
                following: {name: '关注', Icons: Octicons, icon: 'repo'},
            }
        }
    }

    componentDidMount() {
        // debugger
        // const {getUserInfo} = this.props;
        // getUserInfo();
    }

    _getSearchBtn() {
        return <View>
            <TouchableOpacity onPress={() => {
            }}>
                <View style={{padding: 5, marginLeft: 8}}>
                    <Feather
                        name={'search'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    _getSettingBtn() {
        return <View>
            <TouchableOpacity onPress={() => {
                Actions.push('SettingPage')
            }}>
                <View style={{padding: 5, marginRight: 8}}>
                    <Feather
                        name={'settings'}
                        size={24}
                        style={{color: 'white'}}
                    />
                </View>
            </TouchableOpacity>
        </View>
    }

    onClick(name) {
        name = name + ''
        const {theme} = this.props;
        let routeName, params = {};
        if (name.indexOf(this.public_repos) != -1) {
            routeName = 'PublicReposPage';
            params.title = this.public_repos;
            params.theme = theme
        }
        if (name.indexOf(this.followers) != -1) {
            routeName = 'FollowersPage';
            params.title = this.followers;
            params.theme = theme
        }
        if (name.indexOf(this.following) != -1) {
            routeName = 'FollowingPage';
            params.title = this.following;
            params.theme = theme
        }
        if (routeName){
            Actions.push(routeName, params);
        }
    }

    getItem(name,count, Icons, icon) {
        const {theme} = this.props;
        return (
            <TouchableOpacity onPress={() => this.onClick(name)}>
                <View style={styles.item_container}>
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        {Icons && icon ?
                            <Icons name={icon} size={16} style={{color: theme.themeColor, marginRight: 10}}/> :
                            <View style={{opacity: 1, width: 16, height: 16, marginRight: 10}}></View>
                        }
                        <Text style={{fontSize: 16}}>{name+' '}</Text>
                        <Text style={{fontSize: 16,color:theme.themeColor}}>{count}</Text>
                    </View>
                    <Ionicons
                        name='ios-arrow-forward'
                        size={16}
                        style={{color: theme.themeColor || 'black'}}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {theme, user} = this.props;
        let avatar_url = '';
        let public_repos = '';
        let followers = '';
        let following = '';
        let name = '';
        if (user) {
            avatar_url = user.avatar_url ?? '';
            public_repos = (user.public_repos ?? '')
            followers =  (user.followers ?? '')
            following =  (user.following ?? '')
            name = user.login ?? ''
        }
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={Ii8n('tabMy')} style={theme.styles.navBar} statusBar={statusBar}
                                           leftBtn={this._getSearchBtn()} rightBtn={this._getSettingBtn()}/>

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
                                    <Image style={{width: 80, height: 80, marginRight: 10, borderRadius: 40}}
                                           source={{uri: avatar_url}}/>
                                    <Text style={{fontSize: 20}}>{name}</Text>
                                </View>
                                <Ionicons name={'ios-arrow-forward'} size={16}
                                          style={{marginRight: 10, color: theme.themeColor}}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.groupTitle}></Text>
                        {this.getItem(this.public_repos, public_repos, Octicons, 'repo')}
                        {ViewUtil.getLine()}
                        {this.getItem(this.followers,followers, Octicons, 'repo')}
                        {ViewUtil.getLine()}
                        {this.getItem(this.following,following, Octicons, 'repo')}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
    user: state.user.user
})

const mapDispatchToProps = dispatch => ({
    getUserInfo: () => dispatch(actions.getUserInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);

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
        height: 150,
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'
    },
    item_container: {
        backgroundColor: 'white',
        padding: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
});
