import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button, AsyncStorage
} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import {selectLanguage, getRefreshHandler, LANGUAGE_SELECT, LANGUAGE_SELECT_NAME} from '../util/ActionUtil'
import {Actions} from "react-native-router-flux";
import * as ActionUtil from '../util/ActionUtil'
import {changeLocale} from "../util/i18n";
import ViewUtil from "../util/ViewUtil";
import Ii8n from "../util/i18n";


export default class CustomLanguagePage extends Component<Props> {
    render() {
        const {theme} = this.props;
        let statusBar = {
            backgroundColor: theme.themeColor,
            barStyle: 'light-content',
        }
        let navigationBar = <NavigationBar title={Ii8n('customLanguage')} style={theme.styles.navBar} statusBar={statusBar}
                                           leftBtn={ViewUtil.getLeftBackBtn(() => {
                                               Actions.pop()

                                           })}/>
        return (
            <View style={styles.container}>
                {navigationBar}
                <View style={styles.subcontainer}>
                    <Button title={'中文'} onPress={() => {
                       this.changeLanuage('zh-CN')
                    }}/>
                    <Button title={'english'} onPress={() => {
                        this.changeLanuage('en')
                    }}/>
                </View>
            </View>
        );
    }
    changeLanuage(lan) {
        changeLocale(lan);
        AsyncStorage.setItem(ActionUtil.LANGUAGE_SELECT, lan);
        Actions.refresh();
        let handler = getRefreshHandler();
        handler.get(ActionUtil.REFRESH_LANGUAGE) && handler.get(ActionUtil.REFRESH_LANGUAGE)();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    subcontainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
