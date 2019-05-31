import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity, WebView} from 'react-native';
import NavigationBar from "../common/NavigationBar";
import ViewUtil from '../util/ViewUtil'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationUtil from "../navigator/NavigationUtil";
import isIphoneX from '../util/ScreenUtil'
import BackPressComponent from "../common/BackPressComponent";
import FavoriteDao from "../expand/dao/FavoriteDao";
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'


const TRENDINF_URL = 'http://github.com/'
const THEME_COLOR = '#678'

export default class WebViewPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params;
        const {title, url} = this.params;
        this.state = {
            title: title,
            url: url,
            canGoBack: false,
        }
        this.backPress = new BackPressComponent({backPress: () => this.onBackPress()})
    }

    componentDidMount() {
        this.backPress.componentDidMount()
    }

    componentWillUnmount() {
        this.backPress.componentWillUnmount()
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
            NavigationUtil.goBack(this.props.navigation);
        }
    }

    render() {
        const {theme} = this.params
        let navigationBar = <NavigationBar leftBtn={ViewUtil.getLeftBackBtn(() => this.goBack())}
                                           title={this.state.title}
                                           style={theme.styles.navBar}
        />

        return (
            <SafeAreaViewPlus topColor={theme.themeColor}>
                {navigationBar}
                <WebView source={{uri: this.state.url}}
                         ref={webView => this.webView = webView}
                         startInLoadingState={true}
                         onNavigationStateChange={e => this.onNavigationStateChange(e)}
                />
            </SafeAreaViewPlus>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
