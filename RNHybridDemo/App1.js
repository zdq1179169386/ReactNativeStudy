import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

export default class App1 extends Component {
    render() {
        const content = this.props['version']
        return (
            <View style={styles.container}>
                <Image source={{uri: 'icon'}} style={styles.logo}/>
                <Text style={styles.welcome}>机构端APP v{content}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    welcome: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 15,
        color: '#999999',
    }
});

