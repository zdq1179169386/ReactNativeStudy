import React, {Component} from 'react';
import {View, Text, StyleSheet,Button} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class DetailPage extends  Component<Props>{

    render() {
        return(
            <View style={styles.container}>
                <Text>DetailPage</Text>
                <Button title={'pop'} onPress={() => Actions.pop()}/>
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

