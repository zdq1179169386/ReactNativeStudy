import React, {Component} from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class WelcomePage extends  Component<Props>{

    render() {
        return(
            <View style={styles.container}>
                <Text>WelcomePage</Text>
                <Button title={'跳转登录页'} onPress={() => Actions.reset('login')}/>
                <Button title={'跳转主页'} onPress={() => Actions.reset('root')}/>
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

