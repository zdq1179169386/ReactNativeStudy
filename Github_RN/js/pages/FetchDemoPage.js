import React,{Component} from 'react'
import {Button, Platform, StyleSheet, Text, View,TextInput} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";



export default class FetchDemoPage extends Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            searchText:''
        }
    }
    //https://api.github.com/search/repositories?q=java
    _loadData(){
        if (this.searchKey.length == 0){
            return;
        }
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`;
        fetch(url)
            .then(response => {
                if (response.ok){
                    return response.text();
                }
                throw new Error('Network response was not ok');
            })
            .then(responseText => {
                this.setState({
                    searchText:responseText,
                })
            }).catch(e=>{
                this.setState({
                    searchText: e.toString(),
                })
        })

    }
    render() {
        return (
            <View style={styles.container}>
               <View style={styles.inputContainer}>
                   <TextInput style={styles.textInput} onChangeText={(text)=>{
                       this.searchKey = text;
                   }}/>
                   <Button title={'搜索'} onPress={
                       ()=>{
                           this._loadData()
                       }
                   }/>
               </View>
                <Text>{this.state.searchText}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput:{
        height:40,
        borderWidth:1,
        borderColor:'gray',
        flex:1
    },
    inputContainer:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:'center',
        marginTop:10,
        marginLeft:10,
    }
})