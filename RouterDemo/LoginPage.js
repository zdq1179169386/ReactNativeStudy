import React, {Component} from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class LoginPage extends  Component<Props>{

    render() {
        return(
            <View style={styles.container}>
                <Text>LoginPage</Text>
                <Button title='pop' onPress={()=>{
                    Actions.reset('MainTabPage')
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
        backgroundColor: 'red'
    }
})
