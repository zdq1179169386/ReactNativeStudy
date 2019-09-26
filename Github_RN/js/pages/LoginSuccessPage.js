import React, {Component} from 'react';
import {View, Text, StyleSheet,Button,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {TOKEN_KEY} from "../res/Constant";

export default class LoginSuccessPage extends  Component<Props>{
    render() {
        return(
            <View style={styles.container}>
                <Text>LoginSuccessPage</Text>
                <Button title='跳转主页面' onPress={()=>{
                    AsyncStorage.setItem(TOKEN_KEY,'token')
                    Actions.reset('root')
                }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
