import React,{Component} from  'react';
import {Platform, StyleSheet, Text, View} from 'react-native';



export default  class  Page4 extends Component<Props>{
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    welcom to page4
                </Text>
            </View>
        );
    };
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
    },
})