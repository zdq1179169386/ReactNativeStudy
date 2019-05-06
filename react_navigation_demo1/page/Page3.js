import React, {Component} from 'react';
import {TextInput, StyleSheet, Text, View} from 'react-native';


export default class Page3 extends Component<Props> {
    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        const _text = params && params.mode == 'edit' ? '正在编辑' : '完成编辑';

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {_text}
                </Text>
                <TextInput style={styles.input} onChangeText={text => {
                    setParams({title: text});
                }}/>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
    }
})