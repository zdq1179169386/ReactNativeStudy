import React,{Component} from  'react';
import {View, Button, Text, StyleSheet} from 'react-native';


export default class HomePage extends Component<Props>{
    static  navigationOptions = {
        title: 'Home',
        headerBackTitle:'返回',//返回按钮文案有长度限制
    }

    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Button title={'go page1'} onPress={
                    () => {
                        navigation.navigate('Page1',{name: '动态的'})
                    }
                }/>
                <Button title={'go page2'} onPress={
                    ()=>{
                        navigation.navigate.tabBarVisible = true;
                        navigation.navigate('Page2');
                    }
                }/>
                <Button title={'go page3'} onPress={
                    ()=>{
                        navigation.navigate('Page3', {name: 'devin'})
                    }
                }/>
            </View>
        )
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})

