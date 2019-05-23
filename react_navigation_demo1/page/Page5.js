import React,{Component} from  'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';



export default  class  Page5 extends Component<Props>{

    static navigationOptions = ({navigation,screenProps}) => (
        {
        tabBarOnPress:(obj)=>{
            obj.defaultHandler();
        }
})

    render() {
        const {navigation} = this.props;
        return(
            <View style={styles.container}>
                <Button title={'go page1'} onPress={
                    () => {
                        navigation.navigate('Page1',{name: '动态的'})
                    }
                }/>
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