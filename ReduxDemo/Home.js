import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
} from 'react-native';
import {connect} from 'react-redux'
import {add,cut,asyncAdd} from "./reducer";

class  Home extends  Component<Props>{
    render() {
        return (
            <View style={styles.container}>
                <Button title={'加'} onPress={this.props.add}/>
                <Button title={'减'} onPress={this.props.cut}/>
                <Button title={'异步加'} onPress={this.props.asyncAdd}/>
                <Text>{this.props.num}</Text>
            </View>
        )
    }
}
//将state 塞进 props 里
const  mapStatetoProps = (state) => ({
    num: state
})

//将action 塞进 props 里
const actionCreators = {add,cut,asyncAdd}


export default connect(mapStatetoProps,actionCreators)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    }
})


