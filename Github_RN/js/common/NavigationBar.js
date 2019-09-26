import React, {Component} from 'react';
import {PropTypes} from 'prop-types'
import {Platform, StyleSheet, Text, View, Button, DeviceInfo, StatusBar, ViewPropTypes} from 'react-native';
import isIphoneX from '../util/ScreenUtil'

const NAV_BAR_HEIGHT_IOS = 44;//导航栏ios高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏android高度
const STATUS_BAR_HEIGHT = DeviceInfo.isIPhoneX_deprecated ?44 : 20;//状态栏的高度

// statusBar 的属性
const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
}

//自定义 NavigationBar
export default class NavigationBar extends Component {

    //设置属性类型检查
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        hide: PropTypes.bool,
        statusBar: PropTypes.shape(StatusBarShape),
        rightBtn: PropTypes.element,
        leftBtn: PropTypes.element,
    }
    //设置默认属性
    static  defaultProps = {
        statusBar: {
            barStyle: 'light-content',
            hidden: false,
        }
    }

    _getBtnElement(btn) {
        return <View style={styles.navBarBtn}>
            {btn ? btn : null}
        </View>
    }

    //ellipsizeMode 省略号的样式
    render() {
        let statusBar = !this.props.statusBar.hidden ? <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar}/>
        </View> : null;
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode={'head'} numberOfLines={1} style={styles.title}>{this.props.title}</Text>

        let content = this.props.hide ? null : <View style={styles.navBar}>
            {this._getBtnElement(this.props.leftBtn)}
            <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                {titleView}
            </View>
            {this._getBtnElement(this.props.rightBtn)}
        </View>
        return (
            <View style={[styles.container,this.props.style]}>
                {statusBar}
                {content}
            </View>

        );
    }
}


const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Platform.OS === "ios" ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0,
    },
    navBarBtn: {
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#2196f3',
    },
    statusBar: {
        height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    }
})
