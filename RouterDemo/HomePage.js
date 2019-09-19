import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HomePage extends  Component<Props>{

    render() {
        return(
            <View style={styles.container}>
                <Text>HomePage</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
