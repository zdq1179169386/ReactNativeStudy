import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Text
} from 'react-native';
import {createStore} from "redux";
import {counter,add,cut} from "./index.redux";
import App from "react-native/template/App";

 class App2 extends Component {
    constructor(props) {
        super(props)
        this.state= {
            count : 1,
        }
        const  store = createStore(counter);
        store.subscribe(this.listener())
    }
    componentDidMount() {

    }

    render() {
        return (
                <View style={styles.container}>
                    <Button title='加' onPress={() => {
                        const  store = createStore(counter);
                        store.dispatch(add())
                    }}/>
                    <Button title='减' onPress={() => {
                        const  store = createStore(counter);
                        store.dispatch(cut())
                    }}/>
                    <Text>{this.state.count}</Text>
                </View>
                );
    }

     listener() {
        const current = store.getState();
        this.setState({
            count: current
        })
    }
}

const  mapStatetoProps = (state) => ({
    num: state
})

const actionCreators = {add,cut}

connect(mapStatetoProps,actionCreators)(App)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },

    welcome: {
        fontSize: 17,
        textAlign: 'center',
        }
    });

