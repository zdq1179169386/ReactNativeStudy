import React, {Component} from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class HomePage extends  Component<Props>{

    render() {
        return(
            <View style={styles.container}>
                <Text>HomePage</Text>
                <Button title={'跳转详情'} onPress={()=> Actions.DetailPage()}/>
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
