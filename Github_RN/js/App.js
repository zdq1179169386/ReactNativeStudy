import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import getRouter from './Router'
import  {getLanguageCurrent,getRefreshHandler} from './util/ActionUtil'
import  * as ActionUtil from './util/ActionUtil'
import {changeLocale} from './util/i18n'


export default class App extends Component<Props> {

    constructor() {
        super();
        this.state = {
            store: store,
            show: false,//是否需要刷新
        }
        //获取上次存储的语言
        getLanguageCurrent().then((res) => {
            console.log('获取上次存储的语言')
            changeLocale(res.language)
            this.setState({
                show: true
            })
        })
        //刷新的闭包
        getRefreshHandler().set(ActionUtil.REFRESH_LANGUAGE, () => {
            this.setState({
                show: false,
            })
            setTimeout(()=>{
                this.setState({
                    show: true
                })
            },300)
        })
    }

    render() {
        if (!this.state.show) {
            return <View/>
        }
        return (
            <Provider store={this.state.store}>
                {getRouter()}
            </Provider>
        )
    }
}

