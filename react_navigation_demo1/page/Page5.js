import React,{Component} from  'react';
import {Platform, StyleSheet, Text, View} from 'react-native';



export default  class  Page5 extends Component<Props>{

    static navigationOptions = ({navigation,screenProps}) => (
        {
        tabBarOnPress:(obj)=>{
            obj.defaultHandler();
        }
})

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    单 nav + tab + drawer
                    pop 时候的页面上移问题虽然解决了，但是无法在home  的headerleft 加 对 drawer 和 title 的 操作
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