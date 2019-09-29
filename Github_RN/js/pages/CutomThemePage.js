import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import isIphoneX from '../util/ScreenUtil'
import ThemeDao from "../expand/dao/ThemeDao";
import {ThmemeFlags, ThemeFactory} from "../res/ThemeFactory";
import ViewUtil from "../util/ViewUtil";
import {connect} from 'react-redux'
import actions from '../store/action/index'
import SafeAreaViewPlus from '../common/SafeAreaViewPlus'
import GlobalStyles from "../res/GlobalStyles";
import {Actions} from "react-native-router-flux";
import Ii8n from "../util/i18n";


class CutomThemePage extends Component<Props> {

    constructor(props) {
        super(props)
        this.params = this.props.navigation.state.params;
        this.themeDao = new ThemeDao();
    }

    onSelectThemeColor(themekey) {
        const {onThemeChange} = this.props;
        this.themeDao.save(ThmemeFlags[themekey]);
        onThemeChange(ThemeFactory.createTheme(ThmemeFlags[themekey]));
        Actions.pop();
    }

    getThemeItems(themekey) {
        return (<TouchableHighlight style={{flex: 1, underlayColor: 'white'}}
                                    onPress={() => this.onSelectThemeColor(themekey)}>
            <View style={{
                backgroundColor: ThmemeFlags[themekey],
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 3,
                margin: 3,
                height: 100
            }}>
                <Text style={styles.themeText}>
                    {themekey}
                </Text>
            </View>
        </TouchableHighlight>)
    }

    renderThemeItems() {
        const views = [];
        for (let i = 0, keys = Object.keys(ThmemeFlags), len = keys.length; i < len; i += 3) {
            views.push(<View key={i} style={{flexDirection: 'row'}}>
                {this.getThemeItems(keys[i])}
                {this.getThemeItems(keys[i + 1])}
                {this.getThemeItems(keys[i + 2])}
            </View>)
        }
        return views;
    }

    render() {
        const {theme} = this.params;

        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={Ii8n('customTheme')} style={theme.styles.navBar} statusBar={statusBar}
                                           leftBtn={ViewUtil.getLeftBackBtn(() => {
                                               Actions.pop();
                                           })}/>
        return (
            <View>
                {navigationBar}
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({
    onThemeChange: (theme) => dispatch(actions.onThemeChange(theme))
})

export default connect(mapStateToProps, mapDispatchToProps)(CutomThemePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop: isIphoneX ? 30 : 0,
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
    },
    themeText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 16
    }
});
