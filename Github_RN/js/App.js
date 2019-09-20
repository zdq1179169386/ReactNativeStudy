import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigator from './navigator/AppNavigators';
import store from './store';
import getRouter from './Router'

export default class App extends Component<Props> {
  render() {
    return (
        <Provider store={store}>
            {getRouter()}
        </Provider>
    )
  }
}

