import React,{Component} from  'react';
import {Platform, StyleSheet, Text, View} from 'react-native';



export default  class  Page5 extends Component<Props>{
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    tab + 多个 nav + drawer
                    pop 的时候页面有个上移的动作，
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