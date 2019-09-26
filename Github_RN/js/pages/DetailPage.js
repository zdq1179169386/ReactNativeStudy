import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, WebView} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import isIphoneX from '../util/ScreenUtil'
import BackPressComponent from "../common/BackPressComponent";
import FavoriteDao from "../expand/dao/FavoriteDao";
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import {Actions} from "react-native-router-flux";

const TRENDINF_URL = 'http://github.com/'
const THEME_COLOR = '#678'

export default class DetailPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params;
        const {projectModel, flag} = this.params;
        this.favoriteDao = new FavoriteDao(flag);
        const {item} = projectModel;
        this.url = item.html_url || (TRENDINF_URL + item.fullName);
        const title = item.full_name || item.fullName;
        this.state = {
            title: title,
            url: this.url,
            canGoBack: false,
            isFavorite: projectModel.isFavorite
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount()
    }

    onFavoriteBtnClick() {
        const {projectModel, callback} = this.params;
        const isFavorite = projectModel.isFavorite = !projectModel.isFavorite;
        //更改item 的收藏状态
        callback(isFavorite);
        this.setState({
            isFavorite: isFavorite
        })
        let key = projectModel.item.fullName ? projectModel.item.fullName : projectModel.item.id.toString();
        if (projectModel.isFavorite) {
            this.favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
        } else {
            this.favoriteDao.removeFavoriteItem(key);
        }
    }

    getRightBackBtn() {
        return <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.onFavoriteBtnClick()}>
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={26}
                    style={{color: 'white', marginRight: 10}}
                />
            </TouchableOpacity>
            {
                ViewUtil.getShareBtn(() => {

                })
            }
        </View>
    }

    onNavigationStateChange(e) {
        this.setState({
            canGoBack: e.canGoBack,
            url: e.url
        })
    }

    onBackPress() {
        this.goBack();
        return true;
    }


    goBack() {
        if (this.state.canGoBack) {
            this.webView.goBack();
        } else {
           Actions.pop();
        }
    }


    render() {
        const {theme} = this.params;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        const titleLayOut = this.state.title.length > 20 ? {paddingRight: 30} : null;
        let navigationBar = <NavigationBar leftBtn={ViewUtil.getLeftBackBtn(() => this.goBack())}
                                           title={this.state.title}
                                           titleLayoutStyle={titleLayOut}
                                           statusBar={statusBar}
                                           style={theme.styles.navBar}
                                           rightBtn={this.getRightBackBtn()}
        />

        return (
            <View style={styles.container}>
                {navigationBar}
                <WebView source={{uri: this.state.url}}
                         ref={webView => this.webView = webView}
                         startInLoadingState={true}
                         onNavigationStateChange={e => this.onNavigationStateChange(e)}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
