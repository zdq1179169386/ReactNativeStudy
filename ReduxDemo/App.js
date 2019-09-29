import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {applyMiddleware, createStore} from "redux";
import Home from './Home'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import {counter} from './reducer'

//中间件，加入异步组件
const middlewares = [
    thunk
]

const store = createStore(counter,applyMiddleware(...middlewares));

export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Home/>
            </Provider>

        )
    }
}
