import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';


const KEY = 'save_key'

export default class AsyncStoragePage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            text : ''
        }
    }
    async _saveData() {
        if (this.searchKey.length == 0){
            return;
        }
        AsyncStorage.setItem(KEY, this.searchKey)
            .catch(error => {
                error && console.log(error.toString());
            })
    }

   async _delete() {
        AsyncStorage.removeItem(KEY)
            .catch(error => {
                error && console.log(error.toString());
            })

    }

    async _getData() {
        AsyncStorage.getItem(KEY)
            .then(value => {
                this.setState({
                    text:value,
                })
            })
            .catch(error => {

                error && console.log(error.toString());
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput} onChangeText={(text) => {
                    this.searchKey = text;
                }}/>
                <View style={styles.inputContainer}>
                    <Button title={'保存'} onPress={
                        () => {
                            this._saveData()
                        }
                    }/>
                    <Button title={'删除'} onPress={
                        () => {
                            this._delete()
                        }
                    }/>
                    <Button title={'获取'} onPress={
                        () => {
                            this._getData()
                        }
                    }/>
                </View>
                <Text>{this.state.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    }
});
