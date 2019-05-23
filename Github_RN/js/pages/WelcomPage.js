import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'


type Props = {};
export default class WelcomPage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text>WelcomPage</Text>
        <Button title={'主页'} onPress={()=>{
          NavigationUtil.resetToHomePage({
            navigation: this.props.navigation,
          })
        }}/>
      </View>
    );
  }
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
