import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class App extends Component {
    render() {
        return (
                <View style={styles.container}>
                    <Image source={{uri:'icon'}} style={styles.logo}/>>
                     <Text style={styles.welcome}>
                        机构APP v2.20.0
                    </Text>
                </View>
                );
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    },
    welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    }
    });

